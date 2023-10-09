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
    // React.useEffect(() => {
    //     setTimeout(() => window.scrollTo(0, 0), 1000)
    // })
    const { id } = useParams()
    const slotInfo = JSON.parse(localStorage.getItem('slotinfo') || '[]').filter((item: any) => item.id == id) || []
    return (
        <div style={{ height: '100vh', backgroundColor: 'black', padding: '10px 40px', color: 'white' }}>
            <a href="/">
                <img alt='logo' src='/assets/image/logo.png' />
            </a>
            <div style={{ maxWidth: '600px', margin: '20px auto' }}>
                <div style={{ display: 'flex', alignItems:'center' }}>
                    <a onClick={() => window.history.back()} style={{cursor:'pointer', padding:'12px'}}>&larr;</a>
                    <h1>Bet Info Detail</h1>
                </div>
                <DetailRow name='Round ID' val={slotInfo[0]?.id} />
                <DetailRow name='Game' val='Slot Game' />
                <DetailRow name='Bet' val={slotInfo[0]?.bet} />
                <DetailRow name='Win' val={slotInfo[0]?.won_lines.map((item: any) => item.cur_win).reduce((total: number, cur: number) => { return total + cur }, 0)} />
                <DetailRow name='Profit' val={String(slotInfo[0]?.won_lines.map((item: any) => item.cur_win).reduce((total: number, cur: number) => { return total + cur }, 0) - slotInfo[0]?.bet)} />
                {slotInfo[0]?.won_lines.map((item: any, i: number) => <DetailRow key={i} name={`Pay Line #${item.pay_line_id}`} val={item.cur_win} />)}

            </div>

        </div>
    )
}
export default Detail;


