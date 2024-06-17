import { hash } from "bcryptjs";
import AppError from "../../../../errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import { ICreateUser } from "../domain/models/ICreateUser";
import { inject, injectable } from 'tsyringe';
import PasswordsHistoryController from "../../password_history/infra/http/controllers/PasswordsHistoryController";

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private passwordsHistoryController: PasswordsHistoryController
    ) {}
    public async execute({ name, email, password }: ICreateUser): Promise<User> {   

        const emailExists = await this.usersRepository.findByEmail(email);
        
        if (emailExists != null) {
            throw new AppError('Email already used!');
        }

        // Move encryption to application layer!!!
        const hashedPassword = await hash(password, 8);
        
        const user = await this.usersRepository.create({ 
            name: name, 
            email: email, 
            password: hashedPassword
        });
        
        const user_id = user.id;
        const current_password = user.password;

        await this.passwordsHistoryController.create({ user_id, current_password });

        return user;
    }
}

export default CreateUserService;