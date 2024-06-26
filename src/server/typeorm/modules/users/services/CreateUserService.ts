import AppError from "../../../../errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import { ICreateUser } from "../domain/models/ICreateUser";
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    public async execute({ name, email, password }: ICreateUser): Promise<User> {   

        const emailExists = await this.usersRepository.findByEmail(email);
        
        if (emailExists != null) {
            throw new AppError('Email already used!');
        }

        // Move encryption to application layer!!!
        
        
        const user = await this.usersRepository.create({ 
            name: name, 
            email: email, 
            password: password
        });

        return user;
    }
}

export default CreateUserService;