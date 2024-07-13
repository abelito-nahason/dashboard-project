export namespace AuthModel {
    export namespace Request {
        export interface AuthData {
            username:string;
            password:string;
        }
    }

    export namespace Response {
        export interface AuthData {
            token:string;
            message:string;
            success:boolean;
        }
    }
}
