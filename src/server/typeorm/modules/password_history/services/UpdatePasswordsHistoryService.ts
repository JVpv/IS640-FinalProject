import { hash } from "bcryptjs";
import AppError from "../../../../errors/AppError";
import RedisCache from "../../../../cache/RedisCache";
import { inject, injectable } from 'tsyringe';
import { IPasswordsHistoryRepository } from "../domain/repositories/IPasswordsHistoryRepository";
import { IPasswordsHistory } from "../domain/models/IPasswordsHistory";
import PasswordsHistory from "../infra/typeorm/entities/PasswordsHistory";

@injectable()
class UpdatePasswordsHistoryService {
    constructor(
        @inject('PasswordsHistoryRepository')
        private passwordsHistoryRepository: IPasswordsHistoryRepository
    ) {}
    public async execute({ 
        id, 
        user_id, 
        current_password, 
        previous_password_1, 
        previous_password_2, 
        previous_password_3, 
        previous_password_4,
        previous_password_5 
    }: IPasswordsHistory): Promise<PasswordsHistory> { 
        const redisCache = new RedisCache();
        let passwordsHistory = await redisCache.recover<PasswordsHistory>(user_id+'-passwords');

        if (!passwordsHistory) {
            passwordsHistory = await this.passwordsHistoryRepository.find(user_id);

            if (passwordsHistory == null) {
                throw new AppError("User does not exist");
            }
        }

        passwordsHistory.current_password = current_password;
        passwordsHistory.previous_password_1 = previous_password_1;
        passwordsHistory.previous_password_2 = previous_password_2;
        passwordsHistory.previous_password_3 = previous_password_3;
        passwordsHistory.previous_password_4 = previous_password_4;
        passwordsHistory.previous_password_5 = previous_password_5;

        await this.passwordsHistoryRepository.update(passwordsHistory);

        await redisCache.invalidate(user_id+'-passwords');

        await redisCache.save(user_id+'-passwords', passwordsHistory); 

        return passwordsHistory;
    }
}

export default UpdatePasswordsHistoryService;