import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameParams } from '../store/store';
import axios from 'axios';
import '../style/betstyle.css';
function compareDates(date1: Date, date2: Date | null) {
    if (!date2) return true
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    return date1.getTime() === date2.getTime();
}
function compareProfit(profit: number, filterType: number) {
    if (filterType === 0) return true
    if (filterType === 1) return profit >= 0
    if (filterType === -1) return profit < 0
    // return profit * filterType > 0
}

const BetHistory = () => {
    const [page, setPage] = React.useState(1);
    const [date, setDate] = React.useState<Date | null>(null)
    const [filterProfit, setFilterProfit] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [count, setCount] = React.useState(0)
    const [rows, setRows] = React.useState<any[]>([])
    const [betPL, setBetPL] = React.useState<number>(0)
    React.useEffect(() => {
        axios.get(`/api/history/user?page=${page}&items_per_page=${rowsPerPage}&sort_by=created_at&sort_direction=desc`).then(({ data }) => {
            setRows(data.items)
            setCount(data.count)
            setBetPL(data.betPL)
            console.log(data)
        })
    }, [page, rowsPerPage])
    const token = useGameParams().token
    React.useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1000)
    })
    const navigate = useNavigate()
    const handleNext = () => {
        setPage(prev => Math.min(prev + 1, Math.ceil(count / rowsPerPage)))
    }
    const handlePrev = () => {
        setPage(prev => Math.max(prev - 1, 1))
    }
    return (
        <div className='min-h-screen overflow-y-auto' >
            <div className="user-history">
                <div className="user-filter">
                    <div className="input-group">
                        <label className='hidden sm:block' htmlFor="">Select a date to filter</label>
                        <input onChange={(e) => setDate(new Date(e.target.value))} type="date" />
                    </div>
                    <div className="input-group">
                        <label className='hidden sm:block' htmlFor="">Select Status</label>
                        <select onChange={(e) => setFilterProfit(parseInt(e.target.value))} name="" id="">
                            <option value="0">All</option>
                            <option value="1">Won</option>
                            <option value="-1">Loss</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <h3><span className='hidden sm:inline'>Total P/L:</span> <span className="redtext">{betPL.toFixed(2)}</span></h3>
                    </div>
                </div>
                <div className="user-data">
                    <div className="data-header">
                        <i className="fa-solid fa-arrow-left align-middle cursor-pointer" onClick={() => window.history.back()}></i>  My games
                    </div>
                    <div className="data-body overflow-auto" style={{ maxHeight: '70vh' }}>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Round Id</th>
                                        <th>Game</th>
                                        <th>Bet</th>
                                        <th>Win</th>
                                        <th>Profit</th>
                                        <th>Bet Time</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rows.filter(row =>
                                            compareDates(new Date(row.created_at), date) &&
                                            compareProfit(row.profit, filterProfit)
                                        )
                                            .map((row, i) =>
                                                <tr key={i}>
                                                    <td>{row.id}</td>
                                                    <td>Jungle Rumble</td>
                                                    <td>{row.bet.toFixed(2)}	</td>
                                                    <td>{row.win.toFixed(2)}</td>
                                                    <td>{row.profit.toFixed(2)}</td>
                                                    <td>{row.created_at}</td>
                                                    <td><a className='cursor-pointer' onClick={() => { navigate(`/detail/${row.id}?token=${token}`) }}>View Detail</a></td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination-row">
                            <div className="result-text">
                                <h4>Rows per page</h4>
                                <select name="" id="" onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                </select>
                            </div>
                            <div className="pagination-text">
                                <h4> {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, count)} of {count}</h4>
                                <div>
                                    <i onClick={handlePrev} className={`fa-solid fa-chevron-left ${page > 1 ? "active" : ""}`}></i>
                                    <i onClick={handleNext} className={`fa-solid fa-chevron-right ${page < Math.ceil(count / rowsPerPage) ? "active" : ""}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BetHistory;


