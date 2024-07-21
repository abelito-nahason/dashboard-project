import { TableModel } from "../models/table";

export default interface TableRepo {
    getData(data:TableModel.Request.TableData):Promise<TableModel.Response.TableData>
    addData(data:TableModel.Request.AddData): Promise<TableModel.Response.GenericActionResponse>
    updateData(data:TableModel.Request.UpdateData): Promise<TableModel.Response.GenericActionResponse>
    deleteData(data:TableModel.Request.DeleteData): Promise<TableModel.Response.GenericActionResponse>
}