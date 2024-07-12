import { AuthModel } from "../models/auth";
import AuthRepo from "../repository/auth";


export default class AuthUseCase implements AuthRepo {
    constructor(private repo: AuthRepo){}

    loginUser(data: AuthModel.Request.AuthData): Promise<AuthModel.Response.AuthData> {
        return this.repo.loginUser(data)
    }

}