import { ICreatePasswordHistory } from "../models/ICreatePasswordHistory";
import { IPasswordsHistory } from "../models/IPasswordsHistory";

export interface IPasswordsHistoryRepository {
    find(user_id: string): Promise<IPasswordsHistory | null>
    create(data: ICreatePasswordHistory): Promise<IPasswordsHistory>;
    update(data: IPasswordsHistory): Promise<IPasswordsHistory>;
}