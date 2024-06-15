import { hash } from "bcryptjs";
import AppError from "../../../../errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../entities/User";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class SaveUserService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}
    public async execute({ name, email, password }: IRequest): Promise<User> {    
        const user = await this.usersRepository.findByEmail(email);
        
        if (user == null) {
            throw new AppError('User not found!');
        }

        const hashedPassword = await hash(password, 8)

        user.name = name;
        user.password = hashedPassword;

        await this.usersRepository.save(user);

        return user;
    }
}

export default SaveUserService;