import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
const Detail = () => {
    const { id } = useParams()
    const [data, setData] = React.useState<any>(null)
    React.useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1000)
    })
    React.useEffect(() => {
        axios.get(`/api/history/games/${id}/details`).then(({ data: { game } }) => {
            setData(game)
            console.log(game)
        })
    }, [])
    // const slotInfo = JSON.parse(localStorage.getItem('slotinfo') || '[]').filter((item: any) => item.id == id) || []
    return (
        <div className='min-h-screen overflow-y-auto'>

            <div className="user-history w-50">
                <div className="user-data">
                    <div className="data-header">
                        <a ><i onClick={() => window.history.back()} className="fa-solid fa-arrow-left"></i></a> Game {data?.id}
                    </div>
                    <div className="data-body">
                        <div className="table-responsive">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Round Id</td>
                                        <td>{data?.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Variation	</td>
                                        <td>Fruit Slots</td>
                                    </tr>
                                    <tr>
                                        <td>Lines	</td>
                                        <td>{data?.gameable.lines}</td>
                                    </tr>
                                    <tr>
                                        <td>Win</td>
                                        <td>{data?.win}</td>
                                    </tr>
                                    <tr>
                                        <td>Created at</td>
                                        <td>{data?.created_at}</td>
                                    </tr>
                                    <tr>
                                        <td>Updated at</td>
                                        <td>{data?.updated_at}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Detail;


