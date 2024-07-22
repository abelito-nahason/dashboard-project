import { Box, SxProps, Theme } from "@mui/material"
import { JSXElementConstructor, ReactElement } from "react"


type PageHeaderProps = {
    children: ReactElement<any, string | JSXElementConstructor<any>>
    sx?: SxProps<Theme>
}

const PageHeader = ({children, sx}:PageHeaderProps) => {
    
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center', flexDirection:{xs:'column', md:'row'}, gap:{xs:2, md: 0}, ...sx}}>
            {children}
        </Box>
    )

}

export default PageHeader