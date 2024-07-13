import React, { createContext, ReactNode, useContext, useState } from "react";

const LoginContext = createContext<any>(null)

type LoginProviderType = {
    children:ReactNode
}

export const LoginProvider = ({children}:LoginProviderType) => {
    const [isLogin, setLogin] = useState(false);
    
    const logout = () => {
        setLogin(false)
        document.cookie = 'token=a; path=/; max-age=0'
    }

    return (
        <LoginContext.Provider value={{isLogin, setLogin, logout}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)