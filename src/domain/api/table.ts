import axios from "axios";
import { TableModel } from "../models/table";
import TableRepo from "../repository/table";




export default class TableAPI implements TableRepo {
    async getData({limit,page,univCountry,univName}: TableModel.Request.TableData): Promise<TableModel.Response.TableData> {
        const url = 'http://universities.hipolabs.com/search' 
        const offset = limit * (page)
        try {
            const urlSearchParams = new URL(url)
            urlSearchParams.searchParams.append('name', univName)
            urlSearchParams.searchParams.append('country', univCountry)
            urlSearchParams.searchParams.append('limit', limit.toString())
            urlSearchParams.searchParams.append('offset', offset.toString())
            
            const response = await axios.get(urlSearchParams.toString())
            return response.data

        } catch (error:any) {
            console.error(error)
            throw new Error(error || 'Unknown Error')
        }
    }

    async getTotalData({univCountry,univName}: TableModel.Request.TableTotalData): Promise<number> {
        const url = 'http://universities.hipolabs.com/search' 
        try {
            const urlSearchParams = new URL(url)
            urlSearchParams.searchParams.append('name', univName)
            urlSearchParams.searchParams.append('country', univCountry)
            
            const response = await axios.get(urlSearchParams.toString())
            return response.data.length

            
        } catch (error:any) {
            console.error(error)
            throw new Error(error || 'Unknown Error')
        }
    }
}