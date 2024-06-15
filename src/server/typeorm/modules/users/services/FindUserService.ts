import AppError from "../../../../errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../entities/User";

interface IRequest {
    email: string;
}

class FindUserService {
    constructor(
        private usersRepository: IUsersRepository
    ) {}
    public async execute({ email }: IRequest): Promise<User | null> {    
        const user = await this.usersRepository.findByEmail(email);
        
        if (user == null) {
            throw new AppError('User not found!');
        }

        return user;
    }
}

export default FindUserService;