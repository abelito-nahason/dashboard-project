import { GridColDef } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { Box, Button, useTheme } from "@mui/material"
import Header from "../../components/Header"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { Add, FilterAlt} from "@mui/icons-material"
import DataTable from "../../components/DataTable"
import TableUseCase from "../../domain/usecase/table"
import TableAPI from "../../domain/api/table"
import FilterModal from "./components/FilterModal"
import AddModal from "./components/AddModal"
import { TableModel } from "../../domain/models/table"
import { AxiosError } from "axios"


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
    const [openModal, setOpenModal] = useState<string>('')

    const clearFilter = () => {
        setNameSearch('')
        setVendorSearch('')
    }

    const applyFilter = () => {
        setOpenModal('')
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

            <FilterModal
                vendorSearch={vendorSearch}
                setVendorSearch={setVendorSearch}
                openModal={openModal}
                setOpenModal={setOpenModal}
                nameSearch={nameSearch}
                setNameSearch={setNameSearch}
                applyFilter={applyFilter}
                clearFilter={clearFilter}
            />

            <AddModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                tableUseCase={tableData}
                refetch={refetch}
            />

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                <Header title="Product Table View" subTitle="Information about available products" />
                <Box sx={{display:'flex', gap:2}}>
                    <Button onClick={()=> setOpenModal('filter')} sx={{backgroundColor:colors.blueAccent[700], height: '50px', width: '100px'}} variant="contained" endIcon={<FilterAlt/>}>Filter</Button>
                    <Button onClick={()=> setOpenModal('add')} sx={{backgroundColor:colors.blueAccent[700], height: '50px', width: '100px'}} variant="contained" endIcon={<Add/>}>Add</Button>
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

// form validation, loading btn, update, delete

export default TableView