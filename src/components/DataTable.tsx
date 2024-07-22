import { Box, IconButton, LinearProgress, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { DataGrid, DataGridProps, GridColDef, GridPaginationModel } from "@mui/x-data-grid"
import { tokens } from "../theme"
import { ReactNode } from "react"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

export type GridColDefMobile<T> = {
    renderMobile?: (T:T)=> ReactNode
} & GridColDef

type DataGridPropsMobile = {
    columns: GridColDefMobile<any>[]
} & DataGridProps

type ChangePageModel = (data:GridPaginationModel) => void;

type MobilePaginationProps = {
    data:DataGridPropsMobile
    paginationModelChange: ChangePageModel;
    prevPage: (paginationModel:GridPaginationModel, change: ChangePageModel)=> void;
    nextPage: (paginationModel:GridPaginationModel, change: ChangePageModel, maxPage:number)=> void;
    maxPage:number;
}

const MobilePagination = ({data, paginationModelChange, prevPage, nextPage, maxPage}:MobilePaginationProps) => {

    return (
        <Box sx={{display:'flex', justifyContent:"space-between", alignItems:'center'}}>
            <Box sx={{display:'flex', alignItems:'center', gap: 1}}>
                <Typography variant="body2">Page Size: </Typography>
                <TextField select 
                        variant="outlined" 
                        size="small" 
                        SelectProps={{native:true}} 
                        value={data.paginationModel?.pageSize}
                        onChange={(e)=> paginationModelChange({page: 0, pageSize: parseInt(e.target.value)})}
                        >
                    {data.pageSizeOptions?.map((opt) => (
                        <option key={opt.toString()} value={Number(opt)}>{Number(opt)}</option>
                    ))}
                </TextField>
            </Box>
            <Box sx={{display:"flex", alignItems:"center", gap:1}}>
                <Typography>{`${data.paginationModel!.page + 1}/${maxPage + 1}`}</Typography>
                <Box>
                    <IconButton 
                    disabled={data.paginationModel?.page === 0}
                    onClick={()=>prevPage(data.paginationModel!, paginationModelChange)}
                    ><KeyboardArrowLeft/></IconButton>
                    <IconButton
                    disabled={data.paginationModel?.page === maxPage}
                    onClick={()=>nextPage(data.paginationModel!, paginationModelChange, maxPage)}
                    ><KeyboardArrowRight/></IconButton>
                </Box>
            </Box>
    </Box>
    )
}

const LoadingOverlay = () => (
    <Box sx={{display: 'flex', height:'100%', width:'100%', justifyContent:'center', alignItems:'end'}}>
                <LinearProgress color="success" sx={{width:'100%'}} />
    </Box>
)

const DataTable = (data:DataGridPropsMobile) => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const mobile = useMediaQuery(theme.breakpoints.down('md'))
    const paginationModelChange = data.onPaginationModelChange as ChangePageModel;
    const maxPage = Math.ceil((data.rowCount || 0) / data.paginationModel!.pageSize) - 1

    const prevPage = (paginationModel:GridPaginationModel, change: typeof paginationModelChange) => {
        if(paginationModel.page >= 1) {
            change({page: paginationModel.page - 1, pageSize: paginationModel.pageSize})
        }
        document.querySelector('.content')?.scrollTo(0,0)
    }

    const nextPage = (paginationModel: GridPaginationModel, change: typeof paginationModelChange, maxPage:number) => {
        if((paginationModel.page + 1) <= maxPage) {
            change({page: paginationModel.page + 1, pageSize: paginationModel.pageSize})
        }
        document.querySelector('.content')?.scrollTo(0,0)
    }

    if(mobile) return (
        <Box sx={{gap: 2, display:"flex", flexDirection:'column'}}>
            <MobilePagination
                data={data}
                maxPage={maxPage}
                nextPage={nextPage}
                paginationModelChange={paginationModelChange}
                prevPage={prevPage}
            />
            {data.rows!.map((item) => (
                <Paper sx={{p:2, display:'flex', gap:2, flexDirection:'column'}} key={item.id}>
                    {data.columns.map((col:GridColDefMobile<any>) =>{
                        if(col.field === 'id') return undefined
                        if(col.field === 'action') return (
                            <Box key={col.field} sx={{display:'flex', justifyContent:'flex-end', width:"100%"}}>
                                {col.renderMobile!(item)}
                            </Box>
                        )
                        return (
                            <Box key={col.field} >
                                <Typography variant="body2">{`${col.headerName}`}</Typography>
                                <Typography variant="body1" fontWeight={600}>{`${item[col.field] || '-'}`}</Typography>
                            </Box>
                        )
                    })}
                </Paper>
            ))}
            <MobilePagination
                data={data}
                maxPage={maxPage}
                nextPage={nextPage}
                paginationModelChange={paginationModelChange}
                prevPage={prevPage}
            />
        </Box>
    )

    return (
        <DataGrid
        columnVisibilityModel={{
            id:false
        }}
        slots={{
            loadingOverlay: ()=> (<LoadingOverlay/>)
        }}
        sx={{ border:'none',
              height:"calc(100vh - 250px)",
        "--DataGrid-overlayHeight": '500px',
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
        }}}
        {...data}
        />
    )

}

export default DataTable