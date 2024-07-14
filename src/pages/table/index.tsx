import { GridColDef } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { Box, Button, Typography, useTheme } from "@mui/material"
import Header from "../../components/Header"
import { useState } from "react"
import { useQuery } from "react-query"
import { FilterAlt} from "@mui/icons-material"
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
    const [vendorSearch,setVendorSearch] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const clearFilter = () => {
        setNameSearch('')
        setVendorSearch('')
    }

    const applyFilter = () => {
        setOpenModal(false)
        refetch()
    }

    const columns:GridColDef[] = [
        {
            field: 'id'
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 1
        },
        {
            field: 'productVendor',
            headerName: 'Product Vendor',
            flex: 1
        },
        {
            field: 'productPrice',
            headerName: 'Product Price',
            flex: 1
        },
    ]

    const {data, refetch, isFetching} = useQuery({
        queryKey: ['table', paginationModel.page, paginationModel.pageSize],
        queryFn: ()=> tableData.getData({
            pageSize: paginationModel.pageSize,
            pageNumber: paginationModel.page,
            productName: nameSearch,
            productVendor: vendorSearch
        }),
        initialData: {
            results: [],
            totalRows: 0
        },
        keepPreviousData:true
    })

    return (
        <Box sx={{p:4, position: 'relative'}}>

            <PresetModal open={openModal} onClose={()=>setOpenModal(false)}>
                <Box sx={{display: 'flex', flexDirection:'column', gap:4}}>
                    <Typography variant="h2">Filter</Typography>

                    <Box>
                        <Typography variant="body1">Product Name</Typography>
                        <SearchInput
                            value={nameSearch}
                            onChange={setNameSearch}
                            text="Product Name"
                        />
                    </Box>

                    <Box>
                        <Typography variant="body1">Produt Vendor</Typography>
                        <SearchInput
                            value={vendorSearch}
                            onChange={setVendorSearch}
                            text="Product Vendor"
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
                <Header title="Product Table View" subTitle="Information about available products" />

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
                <DataTable rowCount={data?.totalRows} 
                          paginationMode="server" 
                          rows={data?.results || []}
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