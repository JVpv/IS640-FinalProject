import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import FindPasswordsHistoryService from "../../../services/FindPasswordsHistoryService";
import CreatePasswordsHistoryService from "../../../services/CreatePasswordsHistoryService";
import { ICreatePasswordHistory } from "../../../domain/models/ICreatePasswordHistory";
import UpdatePasswordsHistoryService from "../../../services/UpdatePasswordsHistoryService";
import { IPasswordsHistory } from "../../../domain/models/IPasswordsHistory";
import PasswordsHistory from '../../typeorm/entities/PasswordsHistory';

export default class PasswordsHistoryController {
    public async find(user_id: string): Promise<PasswordsHistory | null> {

        const findPasswordsHistory = container.resolve(FindPasswordsHistoryService);

        const passwordsHistory = await findPasswordsHistory.execute( String(user_id) );

        return passwordsHistory;
    }

    public async create({ user_id, current_password }: ICreatePasswordHistory): Promise<PasswordsHistory> {
        const createPasswordsHistory = container.resolve(CreatePasswordsHistoryService);

        const passwordsHistory = await createPasswordsHistory.execute({
            user_id,
            current_password
        } as ICreatePasswordHistory);

        return passwordsHistory;
    }

    public async save({ 
        user_id,
        current_password,
        previous_password_1,
        previous_password_2,
        previous_password_3,
        previous_password_4,
        previous_password_5
     }: IPasswordsHistory): Promise<PasswordsHistory> {
        
        const updatePasswordsHistory = container.resolve(UpdatePasswordsHistoryService);

        const passwordsHistory = await updatePasswordsHistory.execute({
            user_id,
            current_password,
            previous_password_1,
            previous_password_2,
            previous_password_3,
            previous_password_4,
            previous_password_5
        } as IPasswordsHistory);

        return passwordsHistory;
    }
}