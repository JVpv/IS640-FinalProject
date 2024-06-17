import AppError from "../../../../errors/AppError";
import RedisCache from "../../../../cache/RedisCache";
import { inject, injectable } from 'tsyringe';
import { IPasswordsHistoryRepository } from "../domain/repositories/IPasswordsHistoryRepository";
import PasswordsHistory from "../infra/typeorm/entities/PasswordsHistory";

@injectable()
class FindPasswordsHistoryService {
    constructor(
        @inject('PasswordsHistoryRepository')
        private passwordsHistoryRepository: IPasswordsHistoryRepository
    ) {}
    public async execute( user_id: string ): Promise<PasswordsHistory | null> {
        const redisCache = new RedisCache();

        let passwordsHistory = await redisCache.recover<PasswordsHistory>(user_id);

        if (!passwordsHistory) {
            passwordsHistory = await this.passwordsHistoryRepository.find(user_id);

            if (passwordsHistory == null) {
                throw new AppError('User not found!');
            }

            await redisCache.save(user_id, passwordsHistory); 
        }

        return passwordsHistory;
    }
}

export default FindPasswordsHistoryService;