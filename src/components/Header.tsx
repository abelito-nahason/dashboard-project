import { Box, Typography } from "@mui/material";


type HeaderComponent = {
    title:string;
    subTitle:string;
}

const Header = ({title, subTitle}:HeaderComponent) => {
    return (
        <Box>
            <Typography variant="h1" sx={{textAlign:{xs:'center', md: 'start'}}}>{title}</Typography>
            <Typography variant="h5" sx={{textAlign:{xs:'center', md: 'start'}}}>{subTitle}</Typography>
        </Box>
    )
}

export default Header