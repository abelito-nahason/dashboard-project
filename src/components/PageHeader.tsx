import { Box, useTheme } from "@mui/material"
import { JSXElementConstructor, ReactElement } from "react"


type PageHeaderProps = {
    children: ReactElement<any, string | JSXElementConstructor<any>>
}

const PageHeader = ({children}:PageHeaderProps) => {
    
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center', flexDirection:{xs:'column', md:'row'}, gap:{xs:2, md: 0}}}>
            {children}
        </Box>
    )

}

export default PageHeader