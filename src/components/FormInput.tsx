import { Box, colors, InputBase, InputBaseProps, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { RefCallBack } from "react-hook-form";
import { forwardRef } from "react";




type SearchInputProps = {
    errormessage?: string;
} & InputBaseProps 

const FormInput = forwardRef((props:SearchInputProps, ref)=> {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <>
            <Box
                sx={{display: 'flex', 
                    backgroundColor:colors.primary[400], 
                    borderRadius: '3px', 
                    height: 32, 
                    borderBottom: props.error ? 'red 1px solid' : ''}}>
                <InputBase sx={{flex: 1, ml:2}} 
                        {...props}
                        ref={ref}
                        />
            </Box>
        { props.error && <Typography variant="caption">{props.errormessage || ""}</Typography>}
        </>
    )
})


export default FormInput