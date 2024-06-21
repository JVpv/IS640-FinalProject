import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import FindPasswordsHistoryService from "../../../services/FindPasswordsHistoryService";
import CreatePasswordsHistoryService from "../../../services/CreatePasswordsHistoryService";
import { ICreatePasswordHistory } from "../../../domain/models/ICreatePasswordHistory";
import UpdatePasswordsHistoryService from "../../../services/UpdatePasswordsHistoryService";
import { IPasswordsHistory } from "../../../domain/models/IPasswordsHistory";
import PasswordsHistory from '../../typeorm/entities/PasswordsHistory';
import { Request, Response } from "express"
import { json } from 'stream/consumers';

export default class PasswordsHistoryController {
    public async find(request: Request, response: Response): Promise<Response> {

        const user_id = request.params.user_id;

        const findPasswordsHistory = container.resolve(FindPasswordsHistoryService);

        const passwordsHistory = await findPasswordsHistory.execute( String(user_id) );

        return response.json(instanceToInstance(passwordsHistory));
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const user_id = request.body.user_id;
        const current_password = request.body.current_password;

        // Error below!!!
        const createPasswordsHistory = container.resolve(CreatePasswordsHistoryService);

        const passwordsHistory = await createPasswordsHistory.execute({
            user_id,
            current_password
        } as ICreatePasswordHistory);

        return response.json(instanceToInstance(passwordsHistory));
    }

    public async save(request: Request, response: Response): Promise<Response> {

        const user_id = request.body.user_id;
        const current_password = request.body.current_password;
        const previous_password_1 = request.body.previous_password_1;
        const previous_password_2 = request.body.previous_password_2;
        const previous_password_3 = request.body.previous_password_3;
        const previous_password_4 = request.body.previous_password_4;
        const previous_password_5 = request.body.previous_password_5;
        
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

        return response.json(instanceToInstance(passwordsHistory));
    }
}