export namespace TableModel {
    export namespace Request {
        export interface TableData {
            pageSize:number;
            pageNumber:number;
            productName:string;
            productVendor:string;        
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
    }
}