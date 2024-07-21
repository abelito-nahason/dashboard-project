import { Dispatch, SetStateAction, useState } from "react"
import { CSSObject, Divider, Drawer, IconButton, List, Theme, styled, useMediaQuery, useTheme } from "@mui/material"
import MuiDrawer from '@mui/material/Drawer'
import { useNavigate } from "react-router-dom"
import { tokens} from "../../theme"
import { ChevronLeft, ChevronRight, TableView } from "@mui/icons-material"
import SideBarListItem from "./SidebarListItem"

type SidebarProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>
}


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar = ({drawerOpen: open, setDrawerOpen: setOpen}:SidebarProps) => {
    
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate()
    const mobile = useMediaQuery(theme.breakpoints.down('md'))

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    console.log(colors.primary[700])

    if(mobile) return (
      <Drawer PaperProps={{sx:{backgroundColor: colors.primary[700]}}} variant="temporary" open={open}>
        <DrawerHeader sx={{justifyContent: "end"}}>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? <ChevronLeft/> : <ChevronRight/>}
        </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
            <SideBarListItem onClick={()=> navigate('/')} Icon={TableView} open={true} text="Product View"/>
        </List>
      </Drawer>
    ) 
    
    return (
        <StyledDrawer PaperProps={{sx:{backgroundColor: colors.primary[700]}}} variant="permanent" open={open}>
            <DrawerHeader sx={{justifyContent: "end"}}>
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                {open ? <ChevronLeft/> : <ChevronRight/>}
            </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                <SideBarListItem onClick={()=> navigate('/')} Icon={TableView} open={open} text="Product View"/>
            </List>
        </StyledDrawer>
    )

}


export default Sidebar