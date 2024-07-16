import { Button, ButtonProps, useTheme } from "@mui/material"
import { tokens } from "../theme"


type ButtonComponentProps = {
    onClick?: ()=> void;
    text:string;
} & ButtonProps

const ButtonComponent = ({onClick, text, ...rest}:ButtonComponentProps) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Button onClick={onClick} sx={{backgroundColor:colors.blueAccent[700], color:colors.primary[100], height: '50px', width: '100%'}} {...rest}>
                {text}
        </Button>
    )

}

export default ButtonComponent