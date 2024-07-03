import { TableModel } from "../models/table";

export default interface TableRepo {
    getData(data:TableModel.Request.TableData):Promise<TableModel.Response.TableData>
    getTotalData(data:TableModel.Request.TableTotalData):Promise<TableModel.Response.TotalTableData>
}