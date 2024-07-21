import { Route, Routes } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import TableView from "./pages/table";
import Sidebar from "./pages/global/Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/auth/login";
import { useEffect, useState } from "react";
import getCookie from "./utils/getCookie";
import { LoginProvider, useLogin } from "./utils/useLogin";


const Application = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="app">
      <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      <main className="content">
        <Topbar setDrawerOpen={setDrawerOpen}/>
        <Routes>
            <Route path="/" element={<TableView/>}></Route>
        </Routes>
      </main>
    </div>
  )
}

const AuthStage = () => {
  const {isLogin, setLogin} = useLogin()

  useEffect(()=> {
    const cookie = getCookie('token')
    if(cookie) setLogin(true)
  })

  return (
    <>
      {isLogin ? <Application/> : <Login/>}
    </>
  )
}

function App() {

  const {theme, colorMode} = useMode()
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
            <LoginProvider>
              <AuthStage/>
            </LoginProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
