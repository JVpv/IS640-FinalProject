import CreateUserService from "../../../services/CreateUserService";
import FindUserService from "../../../services/FindUserService";
import { Request, Response } from "express"
import SaveUserService from "../../../services/SaveUserService";
import { instanceToInstance } from 'class-transformer';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';
import { ICreateUser } from "../../../domain/models/ICreateUser";

export default class UsersController {
    public async find(request: Request, response: Response): Promise<Response> {
        const email = request.query.email;

        const findUser = container.resolve(FindUserService);

        const user = await findUser.execute( String(email) );

        return response.json(instanceToInstance(user));
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const name = request.query.name;
        const email = request.query.email;
        const password = request.query.password;

        const createUser = container.resolve(CreateUserService);

        const user = createUser.execute({
            name,
            email,
            password
        } as ICreateUser);

        return response.json(instanceToInstance(user));
    }

    public async save(request: Request, response: Response): Promise<Response> {
        const name = request.query.name;
        const email = request.query.email;
        const password = request.query.password;

        const saveUser = container.resolve(SaveUserService);

        const user = saveUser.execute({
            name,
            email,
            password
        } as ICreateUser);

        return response.json(instanceToInstance(user));
    }
}