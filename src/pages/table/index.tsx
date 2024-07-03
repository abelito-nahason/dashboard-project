import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { Box, Button, CircularProgress, IconButton, InputBase, Modal, Typography, useTheme } from "@mui/material"
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { FilterAlt, SearchOutlined } from "@mui/icons-material"
import SearchInput from "../../components/SearchInput"
import PresetModal from "../../components/PresetModal"
import ButtonComponent from "../../components/ButtonComponent"
import DataTable from "../../components/DataTable"
import TableUseCase from "../../domain/usecase/table"
import TableAPI from "../../domain/api/table"


const TableView = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const tableData = new TableUseCase(new TableAPI)

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0
    })

    const [nameSearch, setNameSearch] = useState('')
    const [countrySearch,setCountrySearch] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const refetchData = () => {
        refetch()
        refetchTotal()
    }

    const clearFilter = () => {
        setNameSearch('')
        setCountrySearch('')
        // setOpenModal(false)
        // refetchData()
        // setIsRefetch(true)
    }

    const applyFilter = () => {
        setOpenModal(false)
        refetchData()
    }

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

    const {data:totalInstances, isFetching, refetch:refetchTotal} = useQuery({
        queryKey: ['totalData'],
        queryFn: ()=> tableData.getTotalData({
            univName: nameSearch,
            univCountry: countrySearch
        }),
        initialData: 0,
        refetchOnWindowFocus: false,
    })

    const {data, refetch} = useQuery({
        queryKey: ['table', paginationModel.page, paginationModel.pageSize],
        queryFn: ()=> tableData.getData({limit: paginationModel.pageSize, page: paginationModel.page, univName: nameSearch, univCountry: countrySearch}),
        initialData: [],
        keepPreviousData: false,
        enabled: totalInstances !== 0
    })

    return (
        <Box sx={{p:4, position: 'relative'}}>

            <PresetModal open={openModal} onClose={()=>setOpenModal(false)}>
                <Box sx={{display: 'flex', flexDirection:'column', gap:4}}>
                    <Typography variant="h2">Filter</Typography>

                    <Box>
                        <Typography variant="body1">Univesity Name</Typography>
                        <SearchInput
                            value={nameSearch}
                            onChange={setNameSearch}
                            text="University Name"
                        />
                    </Box>

                    <Box>
                        <Typography variant="body1">Country</Typography>
                        <SearchInput
                            value={countrySearch}
                            onChange={setCountrySearch}
                            text="Country"
                        />
                    </Box>

                    <Box sx={{display:'flex', gap:2}}>
                        <ButtonComponent onClick={clearFilter} text="Clear Filter"/>
                        <ButtonComponent onClick={applyFilter} text="Apply"/>
                    </Box>

                    {/* <IconButton onClick={()=> {refetch(); refetchTotal()}}><SearchOutlined/></IconButton> */}

                </Box>
            </PresetModal>


            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                <Header title="University Table View" subTitle="Information about universities worldwide" />

                <Button onClick={()=> setOpenModal(true)} sx={{backgroundColor:colors.blueAccent[700], height: '50px', width: '100px'}} variant="contained" endIcon={<FilterAlt/>}>Filter</Button>

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
                <DataTable getRowId={(row)=> row.name} 
                          rowCount={totalInstances} 
                          paginationMode="server" 
                          rows={data}
                          loading={isFetching}
                          paginationModel={paginationModel} 
                          onPaginationModelChange={setPaginationModel}
                          columns={columns} 
                          pageSizeOptions={[100, 20,10,5]}/>
            </Box>
        </Box>
    )

}


export default TableView