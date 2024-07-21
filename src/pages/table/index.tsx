import { tokens } from "../../theme"
import { Box, Button, IconButton, useTheme } from "@mui/material"
import Header from "../../components/Header"
import { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "react-query"
import { Add, Delete, Edit, FilterAlt} from "@mui/icons-material"
import DataTable, { GridColDefMobile } from "../../components/DataTable"
import TableUseCase from "../../domain/usecase/table"
import TableAPI from "../../domain/api/table"
import FilterModal from "./components/FilterModal"
import AddModal from "./components/AddModal"
import UpdateModal from "./components/UpdateModal"
import { TableModel } from "../../domain/models/table"
import DeleteModal from "./components/DeleteModal"
import PageHeader from "../../components/PageHeader"


type ActionCellRenderProps = {
    setUpdateValues: Dispatch<SetStateAction<TableModel.Request.UpdateData>>;
    updateValues: TableModel.Request.UpdateData;
    setOpenModal: Dispatch<SetStateAction<string>>
    setProductIdDelete: Dispatch<SetStateAction<string>>
    deleteValue:string;
}


const ActionCellRender = ({setUpdateValues, setOpenModal, setProductIdDelete, updateValues, deleteValue}:ActionCellRenderProps) => {
    return (
        <>
        <IconButton
            onClick={()=> {
                setUpdateValues(updateValues)
                setOpenModal('update')
            }}
        ><Edit/></IconButton>
        <IconButton onClick={()=> {
            setOpenModal('delete')
            setProductIdDelete(deleteValue)
        }}><Delete/></IconButton>

    </>
    )
}


const TableView = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const tableData = new TableUseCase(new TableAPI())

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0
    })

    const [nameSearch, setNameSearch] = useState('')
    const [vendorSearch,setVendorSearch] = useState('')
    const [openModal, setOpenModal] = useState('')
    const [updateValues, setUpdateValues] = useState<TableModel.Request.UpdateData>({
        productId: '',
        productName: '',
        productPrice: '',
        productVendor: ''
    })
    const [productIdDelete, setProductIdDelete] = useState('')

    const clearFilter = () => {
        setNameSearch('')
        setVendorSearch('')
    }

    const applyFilter = () => {
        setOpenModal('')
        refetch()
    }

    const columns:GridColDefMobile<any>[] = [
        {
            field: 'id'
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            flex: 1,
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            flex: 1
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
        {
            field: 'action',
            headerName: '',
            flex: 1,
            maxWidth: 150,
            renderCell: (fields) => ActionCellRender({
                setOpenModal,
                setProductIdDelete,
                setUpdateValues,
                updateValues: {
                    productId: fields.row.id,
                    productName: fields.row.productName,
                    productPrice: fields.row.productPrice,
                    productVendor: fields.row.productVendor
                },
                deleteValue: fields.row.id
            }),
            renderMobile: ({id, productName, productPrice, productVendor}) => ActionCellRender({
                setOpenModal,
                setProductIdDelete,
                setUpdateValues,
                updateValues : {
                    productId: id,
                    productName,
                    productPrice,
                    productVendor
                },
                deleteValue: id
            })
        }
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
        <Box sx={{p:{xs:2, md:4}, position: 'relative'}}>

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

            <UpdateModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                tableUseCase={tableData}
                refetch={refetch}
                defaultValues={updateValues}
            />

            <DeleteModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                productId={productIdDelete}
                refetch={refetch}
                tableUseCase={tableData}
            />

            <PageHeader>
                <>
                    <Header title="Product Table View" subTitle="Information about available products" />
                    <Box sx={{display:'flex', gap:2}}>
                        <Button onClick={()=> setOpenModal('filter')} sx={{backgroundColor:colors.blueAccent[700], height: '50px', width: '100px'}} variant="contained" endIcon={<FilterAlt/>}>Filter</Button>
                        <Button onClick={()=> setOpenModal('add')} sx={{backgroundColor:colors.blueAccent[700], height: '50px', width: '100px'}} variant="contained" endIcon={<Add/>}>Add</Button>
                    </Box>
                </>
            </PageHeader>

            <Box
                m="40px 0 0 0"
                height='100%'
                position='relative'
                width='100%'
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