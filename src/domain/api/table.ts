import axios, { AxiosError } from "axios";
import { TableModel } from "../models/table";
import TableRepo from "../repository/table";
import getCookie from "../../utils/getCookie";


export default class TableAPI implements TableRepo {
    readonly token = getCookie('token')
    readonly url = process.env.REACT_APP_API!

    async getData({pageNumber, pageSize, productName, productVendor}: TableModel.Request.TableData): Promise<TableModel.Response.TableData> {
        try {
            const urlSearchParams = new URL(`${this.url}/product`)
            urlSearchParams.searchParams.append('pageNumber', (pageNumber + 1).toString())
            urlSearchParams.searchParams.append('pageSize', pageSize.toString())
            urlSearchParams.searchParams.append('productName', productName.toString())
            urlSearchParams.searchParams.append('productVendor', productVendor.toString())
            
            const response = await axios.get(urlSearchParams.toString(), {headers:{'x-token': this.token}})
            return response.data

        } catch (error:any) {
            console.error(error)
            throw new AxiosError(error.response.data.message || 'Unknown Error')
        }
    }

    async addData(data: TableModel.Request.AddData): Promise<TableModel.Response.GenericActionResponse> {
        try {
            const url = new URL(`${this.url}/product`)
            const response = await axios.post(url.toString(), data, {headers: {'x-token' : this.token}})
            return response.data
        } catch (error:any) {
            console.error(error)
            throw new AxiosError(error.response.data.message || 'Unknown Error')
        }
    }

    async updateData(data: TableModel.Request.UpdateData): Promise<TableModel.Response.GenericActionResponse> {
        try {
            const url = new URL(`${this.url}/product`)
            const response = await axios.put(url.toString(), data, {headers: {'x-token': this.token}})
            return response.data
        } catch (error: any) {
            console.error(error)
            throw new AxiosError(error.response.data.message || "Unknown Error")            
        }
    }

}