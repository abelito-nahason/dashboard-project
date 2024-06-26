import { SearchOutlined } from "@mui/icons-material"
import { Box, IconButton, InputBase, useTheme } from "@mui/material"
import { tokens } from "../theme"
import { Dispatch } from "react";


type SearchInputProps = {
    value:string;
    text:string;
    onChange: Dispatch<React.SetStateAction<string>>
}

const SearchInput = ({value, onChange, text}:SearchInputProps) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box
            sx={{display: 'flex', backgroundColor:colors.primary[400], borderRadius: '3px', height: 32}}>
            <InputBase value={value} onChange={(val)=> onChange(val.target.value)} sx={{flex: 1, ml:2}} placeholder={text}/>
        </Box>
    )
}

export default SearchInput