import { hash } from "bcryptjs";
import AppError from "../../../../errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../entities/User";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}
    public async execute({ name, email, password }: IRequest): Promise<User> {   
        
        const emailExists = await this.usersRepository.findByEmail(email);
        
        if (emailExists != null) {
            throw new AppError('Email already used!');
        }

        // This is the part where the password is hashed
        const hashedPassword = await hash(password, 8);
        
        const user = this.usersRepository.create({ 
            name, 
            email, 
            password: hashedPassword
        });
        
        return user;
    }
}

export default CreateUserService;