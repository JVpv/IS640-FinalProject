import AppError from "../../../../errors/AppError";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import RedisCache from "../../../../cache/RedisCache";
import { inject, injectable } from 'tsyringe';

@injectable()
class FindUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    public async execute( email: string ): Promise<User | null> {
        const redisCache = new RedisCache();

        let user = await redisCache.recover<User>(email);

        if (!user) {
            user = await this.usersRepository.findByEmail(email);

            if (user == null) {
                throw new AppError('User not found!');
            }

            await redisCache.save(email, user); 
        }

        return user;
    }
}

export default FindUserService;