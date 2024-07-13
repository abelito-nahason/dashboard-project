import { Box, Divider, IconButton, useTheme } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext, tokens } from "../../theme"
import { LightModeOutlined, DarkModeOutlined, NotificationsOutlined, SettingsOutlined, PersonOutline, Logout } from "@mui/icons-material"
import { useLogin } from "../../utils/useLogin"


const Topbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    const {logout} = useLogin()

    return (
        <Box sx={{display:'flex', justifyContent: 'space-between', p: 2}}>
            <Box></Box>

            <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <IconButton onClick={logout}><Logout/></IconButton>
                <IconButton onClick={colorMode.toggleColorMode}>{theme.palette.mode === 'dark' ? <DarkModeOutlined/> : <LightModeOutlined/>}</IconButton>
            </Box>
        </Box>
    )

}


export default Topbar