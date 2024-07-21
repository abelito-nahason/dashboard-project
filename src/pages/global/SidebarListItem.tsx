import { ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent";


type ListItemProps = {
    open:boolean;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
    text:string;
    onClick: () => void;
}

const SideBarListItem = ({open, Icon, text, onClick}:ListItemProps) => {

    return (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={onClick}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                        <Icon/>
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
    )

}

export default SideBarListItem