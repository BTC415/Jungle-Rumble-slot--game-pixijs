import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const BetHistory = () => {
    React.useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1000)
    })
    const navigate = useNavigate()
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const rows = JSON.parse(localStorage.getItem('slotinfo') || '[]')
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Round ID', width: 100, valueGetter: (params: GridValueGetterParams) => params.row.id },
        { field: 'game', headerName: 'Game', width: 130, valueGetter: () => 'Slot Game' },
        { field: 'bet', headerName: 'Bet', width: 90 },
        { field: 'lines', headerName: 'bline', width: 90 },
        {
            field: 'win',
            headerName: 'Win',
            type: 'number',
            width: 90,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.won_lines.map((item: any) => item.cur_win).reduce((total: number, cur: number) => { return total + cur }, 0)
            }
        },
        {
            field: 'profit',
            headerName: 'Profit',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 90,
            valueGetter: (params: GridValueGetterParams) =>
                params.row.won_lines.map((item: any) => item.cur_win).reduce((total: number, cur: number) => { return total + cur }, 0) - params.row.bet
        },
        { field: 'time', headerName: 'Bet Time', width: 190 },
        {
            field: 'detail',
            headerName: 'View Detail',
            width: 160,
            renderCell: ({ row }) => (<a style={{ cursor: 'pointer' }} onClick={() => { navigate(`/detail/${row.id}`) }}>View Detail</a>),

        },
    ];
    return (
        <div style={{ height: '100vh', backgroundColor: 'black', padding: '10px 40px', color: 'white' }}>
            <a href='/'>
                <img alt='logo' src='/assets/image/logo.png' />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', maxWidth: '1000px', margin: '0 auto'  }}>
                <a onClick={() => window.history.back()} style={{ cursor: 'pointer', padding: '12px' }}>&larr;</a>
                <h1>Bet History</h1>
            </div>
            <div style={{ height: '600px', maxWidth: '1000px', margin: '0 auto' }}>

                <ThemeProvider theme={darkTheme}>
                    <DataGrid

                        sx={{ color: 'white' }}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </ThemeProvider>
            </div>
        </div>
    )
}
export default BetHistory;


