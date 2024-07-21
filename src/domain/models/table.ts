import { object, string } from "yup";

export namespace TableModel {
    export namespace Request {
        export interface TableData {
            pageSize:number;
            pageNumber:number;
            productName:string;
            productVendor:string;        
        }

        export interface AddData {
            productName:string;
            productVendor:string;
            productPrice:string;
        }

        export const addDataSchema = object({
            productName: string().required(),
            productVendor: string().required(),
            productPrice: string().required().test('numbers only', 'The field should only have numbers', (val)=> /^\d+$/.test(val || ''))
        })

        export interface UpdateData {
            productId:string;
            productName:string;
            productVendor:string;
            productPrice:string;
        }

        export const updateDataSchema = addDataSchema.concat(object({productId:string().required()}))

        export interface DeleteData {
            productId:string;
        }

    }

    export namespace Response {
        export type TableData = {
            results: {
                id:string;
                productName:string;
                productVendor:string;
                productPrice:string;
                created_at:string;
            }[]
            totalRows:number;   
        }

        export interface GenericActionResponse {
            message:string;
            success:boolean;
        }
    }
}