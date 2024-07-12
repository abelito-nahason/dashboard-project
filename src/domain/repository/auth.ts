import { AuthModel } from "../models/auth";

export default interface AuthRepo {
    loginUser(data:AuthModel.Request.AuthData): Promise<AuthModel.Response.AuthData>
}