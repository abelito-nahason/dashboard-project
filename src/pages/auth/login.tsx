import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import SearchInput from "../../components/SearchInput"
import ButtonComponent from "../../components/ButtonComponent"
import { useState } from "react"
import { useMutation } from "react-query"
import AuthUseCase from "../../domain/usecase/auth"
import AuthAPI from "../../domain/api/auth"
import { AuthModel } from "../../domain/models/auth"
import { useLogin } from "../../utils/useLogin"

const Login = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const auth = new AuthUseCase(new AuthAPI())
    const {setLogin} = useLogin()

    const {mutate:login, status} = useMutation({
        mutationFn: (data:AuthModel.Request.AuthData)=> auth.loginUser(data),
        onSuccess: (data) => {
            document.cookie = `token=${data.token}; path=/; max-age=${36000}`
            setLogin(true)
        },
        onError: (data:any) => {
            setErrorMessage(data.message || 'Unknown Error')
        }
    })
  
    return (
      <div className="app">
        <Box sx={{ position:'absolute',
                  backgroundColor: colors.primary[600], 
                  width:'450px', 
                  height: '300px', 
                  top:'50%', 
                  left: '50%', 
                  borderRadius: '30px',
                  border: `solid 1px ${colors.grey[700]}`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection:'column',
                  justifyContent:"cemter",
                  alignItems:'center',
                  p:'16px',
                  gap:'8px'
                }}>
            <Typography variant="h1" sx={{textAlign:'center', mb:'16px'}}>Login</Typography>
                <Box sx={{width: '75%'}}>
                    <Typography variant="body1">Username</Typography>
                    <SearchInput
                        value={username}
                        onChange={setUsername}
                        text="Username"
                        />
                </Box>

                <Box sx={{width: '75%', mb:'8px'}}>
                    <Typography variant="body1">Password</Typography>
                    <SearchInput
                        value={password}
                        onChange={setPassword}
                        text="Password"
                        password
                        onKeyDown={(e)=> (
                            e.key === 'Enter' ? login({username,password}) : null
                        )}
                        />
                </Box>

                { status === 'error' && <Typography>{`Login Error: ${errorMessage}`}</Typography>}
                
                <ButtonComponent sx={{backgroundColor:colors.blueAccent[700], color:colors.primary[100], width: '75%', height: '50px'}} 
                                 onClick={()=>login({username, password})} 
                                 text="Login"
                                 type="submit"
                                 />                  
        </Box>
      </div>)
    }

    export default Login