import CreateUserService from "../services/CreateUserService";
import FindUserService from "../services/FindUserService";
import { Request, Response } from "express"
import SaveUserService from "../services/SaveUserService";

export default class UsersController {
    public async find(request: Request, response: Response): Promise<Response> {
        const email = request.query.email;
        
        const findUser = new FindUserService();

        const user = await findUser.execute({ email });

        return response.json(user);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const name = request.query.name;
        const email = request.query.email;
        const password = request.query.password;

        const createUser = new CreateUserService();

        const user = createUser.execute({
            name,
            email,
            password
        });

        return response.json(user);
    }

    public async save(request: Request, response: Response): Promise<Response> {
        const name = request.query.name;
        const email = request.query.email;
        const password = request.query.password;

        const saveUser = new SaveUserService();

        const user = saveUser.execute({
            name,
            email,
            password
        });

        return response.json(user);
    }
}