import { TableModel } from "../models/table";
import TableRepo from "../repository/table";




export default class TableUseCase implements TableRepo {
    constructor(private repo:TableRepo) {}

    async getData(data: TableModel.Request.TableData): Promise<TableModel.Response.TableData> {
        return this.repo.getData(data)
    }

    async addData(data: TableModel.Request.AddData): Promise<TableModel.Response.GenericActionResponse> {
        return this.repo.addData(data)
    }

    async updateData(data: TableModel.Request.UpdateData): Promise<TableModel.Response.GenericActionResponse> {
        return this.repo.updateData(data)
    }

    async deleteData(data: TableModel.Request.DeleteData): Promise<TableModel.Response.GenericActionResponse> {
        return this.repo.deleteData(data)
    }

}