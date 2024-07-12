import { Route, Routes } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import TableView from "./pages/table";
import Sidebar from "./pages/global/Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/auth/login";


const Application = () => (
  <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
      <Routes>
          <Route path="/" element={<TableView/>}></Route>
      </Routes>
    </main>
  </div>
)

function App() {

  const {theme, colorMode} = useMode()
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
          <Login/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
