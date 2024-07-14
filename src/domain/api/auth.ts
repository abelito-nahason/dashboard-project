import axios, { AxiosError } from "axios";
import { AuthModel } from "../models/auth";
import AuthRepo from "../repository/auth";


export default class AuthAPI implements AuthRepo {
    async loginUser(data: AuthModel.Request.AuthData): Promise<AuthModel.Response.AuthData> {
        const url = process.env.REACT_APP_API
        console.log(url)
        try {
            const response = await axios.post(`${url!}/login`, data, {method:'POST'})
            return response.data
        } catch (error:any) {
            console.error(error)
            throw new AxiosError(error.response.data.message || 'Unknown Error')
            // throw new Error(error || 'Unknown Error')
        }
    }
}