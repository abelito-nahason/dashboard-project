import { Title } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";


type HeaderComponent = {
    title:string;
    subTitle:string;
}

const Header = ({title, subTitle}:HeaderComponent) => {
    return (
        <Box>
            <Typography variant="h1">{title}</Typography>
            <Typography variant="h5">{subTitle}</Typography>
        </Box>
    )
}

export default Header