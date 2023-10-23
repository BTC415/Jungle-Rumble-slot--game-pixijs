import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
const DetailRow = ({ name, val }: { name: string, val: string }) => {
    return (
        <div style={{ borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', width: '100%', margin: '20px 0' }}>
            <div>{name}</div>
            <div>{val}</div>
        </div>
    )
}
const Detail = () => {
    const { id } = useParams()
    const [data, setData] = React.useState<any>(null)
    React.useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1000)
    })
    React.useEffect(() => {
        axios.get(`/api/history/games/${id}/details`).then(({ data: { game } }) => {
            setData(game)
        })
    }, [])
    // const slotInfo = JSON.parse(localStorage.getItem('slotinfo') || '[]').filter((item: any) => item.id == id) || []
    return (
        <div style={{ height: '100vh', backgroundColor: 'black', padding: '10px 40px', color: 'white' }}>
            <a href="/">
                <img alt='logo' src='/assets/image/logo.png' />
            </a>
            <div style={{ maxWidth: '600px', margin: '20px auto' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a onClick={() => window.history.back()} style={{ cursor: 'pointer', padding: '12px' }}>&larr;</a>
                    <h1>Bet Info Detail</h1>
                </div>
                <DetailRow name='Round ID' val={data?.id} />
                <DetailRow name='Game' val='Slot Game' />
                <DetailRow name='Bet' val={data?.bet} />
                <DetailRow name='Win' val={data?.win} />
                <DetailRow name='Profit' val={data?.profit} />
                {data && data.gameable.win_titles && Object.keys(data.gameable.win_titles).map((item: any, i: number) => <DetailRow key={i} val={`${data.gameable.win_titles[item]}`} name={item} />)}

            </div>

        </div>
    )
}
export default Detail;


