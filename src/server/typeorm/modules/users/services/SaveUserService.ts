import AppError from "../../../../errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import RedisCache from "../../../../cache/RedisCache";
import { ICreateUser } from "../domain/models/ICreateUser";
import { inject, injectable } from 'tsyringe';

@injectable()
class SaveUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    public async execute({ name, email, password }: ICreateUser): Promise<User> { 
        const redisCache = new RedisCache();
        let user = await redisCache.recover<User>(email);

        if (!user) {
            user = await this.usersRepository.findByEmail(email);

            if (user == null) {
                throw new AppError('User not found!');
            }
        }

        user.name = name;
        user.password = password;

        await this.usersRepository.save(user);

        await redisCache.save(email, user); 

        return user;
    }
}

export default SaveUserService;