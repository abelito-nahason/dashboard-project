import { Box, Modal, useTheme } from "@mui/material";
import { JSXElementConstructor, ReactElement } from "react";
import { tokens } from "../theme";


type PresetModalProps = {
    open:boolean;
    onClose: ()=> void;
    children: ReactElement<any, string | JSXElementConstructor<any>>
}


const PresetModal = ({open, onClose, children}:PresetModalProps) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
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