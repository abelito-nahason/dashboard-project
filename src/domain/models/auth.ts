export namespace AuthModel {
    export namespace Request {
        export interface AuthData {
            username:string;
            password:string;
        }
    }

    export namespace Response {
        export interface AuthData {
            message:string;
            success:boolean;
        }
    }
}
