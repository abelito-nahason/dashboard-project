import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { Dispatch, SetStateAction, useContext } from "react"
import { ColorModeContext } from "../../theme"
import { LightModeOutlined, DarkModeOutlined, Logout, Menu } from "@mui/icons-material"
import { useLogin } from "../../utils/useLogin"


type TopbarProps = {
    setDrawerOpen: Dispatch<SetStateAction<boolean>>
}

const Topbar = ({setDrawerOpen}:TopbarProps) => {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
    const {logout} = useLogin()
    const mobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box sx={{display:'flex', justifyContent: 'space-between', p: 2}}>
            <Box>
                {mobile && <IconButton onClick={()=> setDrawerOpen(true)}><Menu/></IconButton>}
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <IconButton onClick={logout}><Logout/></IconButton>
                <IconButton onClick={colorMode.toggleColorMode}>{theme.palette.mode === 'dark' ? <DarkModeOutlined/> : <LightModeOutlined/>}</IconButton>
            </Box>
        </Box>
    )

}


export default Topbar