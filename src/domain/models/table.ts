export namespace TableModel {
    export namespace Request {
        export interface TableData {
            limit: number;
            page: number;
            univName:string;
            univCountry:string;        
        }

        export interface TableTotalData extends Pick<TableData, 'univName' | 'univCountry'> {

        }
    }

    export namespace Response {
        export type TableData = {
            name:string;
            country:string;
            domain:string[];
        }[]

        export type TotalTableData = number;
    }
}