import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGameParams } from '../store/store';
import axios from 'axios';
const BetHistory = () => {
    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.debug(event)
        setPage(value);
    };
    const [rows, setRows] = React.useState<any[]>([])
    React.useEffect(() => {
        axios.get(`/api/history/user?page=${page}&items_per_page=10&sort_by=created_at&sort_direction=desc`).then(({ data }) => {
            setRows(data.items)
            setPageCount(Math.ceil(data.count / 10))
        })
    }, [page])
    const token = useGameParams().token
    React.useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1000)
    })
    const navigate = useNavigate()
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    // const rows = JSON.parse(localStorage.getItem('slotinfo') || '[]')
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Round ID', width: 100, valueGetter: (params: GridValueGetterParams) => params.row.id },
        { field: 'game', headerName: 'Game', width: 130, valueGetter: () => 'Slot Game' },
        { field: 'bet', headerName: 'Bet', width: 90 },
        { field: 'blines', headerName: 'lines', width: 90, valueGetter: (params: GridValueGetterParams) => params.row.gameable.lines },
        {
            field: 'win',
            headerName: 'Win',
            type: 'number',
            width: 90,
            valueGetter: (params: GridValueGetterParams) => params.row.win
        },
        {
            field: 'profit',
            headerName: 'Profit',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 90,
            valueGetter: (params: GridValueGetterParams) => params.row.profit
        },
        { field: 'time', headerName: 'Bet Time', width: 190, valueGetter: (params: GridValueGetterParams) => params.row.created_at },
        {
            field: 'detail',
            headerName: 'View Detail',
            width: 160,
            renderCell: ({ row }) => (<a style={{ cursor: 'pointer' }} onClick={() => { navigate(`/detail/${row.id}?token=${token}`) }}>View Detail</a>),

        },
    ];
    return (
        <div style={{ height: '100vh', backgroundColor: 'black', padding: '10px 40px', color: 'white',overflowY:'auto' }}>
            <a href={`/?token=${useGameParams().token}`}>
                <img alt='logo' src='/assets/image/logo.png' />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                <a onClick={() => window.history.back()} style={{ cursor: 'pointer', padding: '12px' }}>&larr;</a>
                <h1>Bet History</h1>
            </div>
            <Pagination color='secondary' sx={{"button":{color:'white'}}} count={pageCount} page={page} onChange={handleChange} />
            <div style={{  maxWidth: '1000px', margin: '0 auto' }}>

                <ThemeProvider theme={darkTheme}>
                    <DataGrid
                        hideFooterPagination
                        sx={{ color: 'white' }}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        checkboxSelection

                    />
                </ThemeProvider>
            </div>
        </div>
    )
}
export default BetHistory;


