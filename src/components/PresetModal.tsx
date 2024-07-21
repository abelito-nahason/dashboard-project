import { Box, Modal, useMediaQuery, useTheme } from "@mui/material";
import { JSXElementConstructor, ReactElement } from "react";
import { tokens } from "../theme";


type PresetModalProps = {
    open:boolean;
    onClose: ()=> void;
    children: ReactElement<any, string | JSXElementConstructor<any>>
    overrideWidth?:string;
}


const PresetModal = ({open, onClose, children, overrideWidth}:PresetModalProps) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const mobile = useMediaQuery(theme.breakpoints.down('md'))

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: mobile ? '100%' : (overrideWidth || '40%'),
        height: mobile ? '100%' : 'auto',
        bgcolor: colors.primary[700],
        border: '1px solid',
        borderColor: colors.primary[700],
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )

}

export default PresetModal