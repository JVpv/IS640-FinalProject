import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUsersRepository {
    findByEmail(email: string): Promise<IUser | null>
    create(data: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
}