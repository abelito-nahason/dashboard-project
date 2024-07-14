import { TableModel } from "../models/table";
import TableRepo from "../repository/table";




export default class TableUseCase implements TableRepo {
    constructor(private repo:TableRepo) {}

    async getData(data: TableModel.Request.TableData): Promise<TableModel.Response.TableData> {
        return this.repo.getData(data)
    }

}