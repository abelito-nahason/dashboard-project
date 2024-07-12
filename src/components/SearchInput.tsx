import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, IconButton, InputBase, InputBaseProps, useTheme } from "@mui/material"
import { tokens } from "../theme"
import { Dispatch, useState } from "react";


type SearchInputProps = {
    value:string;
    text:string;
    onChange: Dispatch<React.SetStateAction<string>>
    password?: boolean;
} & Omit<InputBaseProps, 'onChange'> 

const SearchInput = ({value, onChange, text, password, ...rest}:SearchInputProps) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isPass, setIsPass] = useState(password)

    return (
        <Box
            sx={{display: 'flex', backgroundColor:colors.primary[400], borderRadius: '3px', height: 32}}>
            <InputBase value={value} 
                       onChange={(val)=> onChange(val.target.value)} 
                       sx={{flex: 1, ml:2}} 
                       placeholder={text} 
                       type={isPass ? 'password' : 'text'}
                       endAdornment={password ? (<IconButton onClick={()=> setIsPass((prevVal) => !prevVal)}>{!isPass ? <Visibility/> : <VisibilityOff/>}</IconButton>) : undefined}
                       {...rest}
                       />
        </Box>
    )
}

export default SearchInput