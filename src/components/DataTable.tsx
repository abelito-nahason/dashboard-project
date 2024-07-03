import { Box, CircularProgress, useTheme } from "@mui/material"
import { DataGrid, DataGridProps } from "@mui/x-data-grid"
import { tokens } from "../theme"




const DataTable = (data:DataGridProps) => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <DataGrid
        slots={{
            loadingOverlay: ()=> (<Box sx={{display: 'flex', height:'100%', justifyContent:'center', alignItems:'center'}}><CircularProgress sx={{color:colors.blueAccent[700]}}/></Box>)
          }}
        {...data}
        />
    )

}

export default DataTable