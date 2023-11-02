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
    const [items, setItems] = React.useState<any[]>([])
    const [betPL, setBetPL] = React.useState<number>(0)
    const [filteredItems, setFilteredItems] = React.useState<any[]>([])
    const [slicedItems, setSlicedItems] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        fetchAllData()
    }, [])
    React.useEffect(() => {
        setFilteredItems(items.filter(row =>
            compareDates(new Date(row.created_at), date) &&
            compareProfit(row.profit, filterProfit)
        ))
    }, [date, filterProfit, items, rowsPerPage, page])
    React.useEffect(() => {
        setSlicedItems(filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage))
    }, [filteredItems])
    React.useEffect(() => { setCount(filteredItems.length) }, [filteredItems])
    React.useEffect(() => { setPage(1) }, [date, filterProfit])
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
    const fetchAllData = async () => {
        setLoading(true)
        const { data: { count, items, betPL } }: { data: { count: number, items: any[], betPL: number } } = await axios.get(`/api/history/user?page=1&items_per_page=200&sort_by=created_at&sort_direction=desc`)
        setCount(count)
        setBetPL(betPL)
        setItems(items)
        for (let i = 2; i <= Math.ceil(count / 200); i++) {
            const { data: { items } }: { data: { items: any[] } } = await axios.get(`/api/history/user?page=${i}&items_per_page=200&sort_by=created_at&sort_direction=desc`)
            setItems(prev => ([...prev, ...items]))
        }
        setLoading(false)
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
                    <div className="data-body relative">
                        <div className={`${loading ? "flex" : "hidden"} justify-center items-center absolute top-0 w-full h-full z-10 bg-black/50`}>
                            <img src="/assets/res/loading.gif" alt="loading..." width={120} height={120} />
                        </div>
                        <div className="table-responsive overflow-auto" style={{ maxHeight: '70vh' }}>
                            <table>
                                <thead className='sticky top-0 bg-black'>
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
                                        slicedItems.map((row, i) =>
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


