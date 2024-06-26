import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { Box, IconButton, InputBase, Typography, useTheme } from "@mui/material"
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import getTableView from "../../API/TableView"
import getTotalTableView from "../../API/TableViewTotaldata"
import { useQuery } from "react-query"
import { SearchOutlined } from "@mui/icons-material"
import SearchInput from "../../components/SearchInput"


const TableView = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0
    })

    const [nameSearch, setNameSearch] = useState('')
    const [countrySearch,setCountrySearch] = useState('')

    const columns:GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 1
        },
        {
            field: 'domain',
            headerName: 'Domain',
            flex: 1,
            renderCell: (params) => {
                return params.row.domains[0]
            }
        }
    ]

    const {data:totalInstances, isLoading, refetch:refetchTotal} = useQuery({
        queryKey: ['totalData'],
        queryFn: ()=> getTotalTableView({
            univName: nameSearch,
            univCountry: countrySearch
        }),
        initialData: 0,
        refetchOnWindowFocus: false,
    })

    const {data, refetch} = useQuery({
        queryKey: ['table', paginationModel.page, paginationModel.pageSize],
        queryFn: ()=> getTableView({limit: paginationModel.pageSize, page: paginationModel.page, univName: nameSearch, univCountry: countrySearch}),
        initialData: []
    })

    return (
        <Box sx={{p:4, position: 'relative'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                <Header title="University Table View" subTitle="Information about universities worldwide" />
                <Box sx={{display: 'flex', gap:2, height: '100%'}}>
                    <SearchInput
                        value={nameSearch}
                        onChange={setNameSearch}
                        text="University Name"
                    />

                    <SearchInput
                        value={countrySearch}
                        onChange={setCountrySearch}
                        text="Country"
                    />

                    <IconButton onClick={()=> {refetch(); refetchTotal()}}><SearchOutlined/></IconButton>
                </Box>
            </Box>
            <Box
                m="40px 0 0 0"
                height='75vh'
                position='absolute'
                width='97%'
                sx={{
                    "& .MuiDataGrid-root": {
                        border: 'none',
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: 'none'
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none'
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700]
                    }
                }}
            >
                <DataGrid getRowId={(row)=> row.name} 
                          rowCount={totalInstances} 
                          paginationMode="server" 
                          rows={data}
                          loading={isLoading}
                          paginationModel={paginationModel} 
                          onPaginationModelChange={setPaginationModel}
                          columns={columns} 
                          pageSizeOptions={[100, 20,10,5]}/>
            </Box>
        </Box>
    )

}


export default TableView