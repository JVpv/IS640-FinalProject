import { inject, injectable } from 'tsyringe';
import { ICreatePasswordHistory } from "../domain/models/ICreatePasswordHistory";
import PasswordsHistory from "../infra/typeorm/entities/PasswordsHistory";
import { IPasswordsHistoryRepository } from "../domain/repositories/IPasswordsHistoryRepository";
import AppError from '../../../../errors/AppError';

@injectable()
class CreatePasswordsHistoryService {
    constructor(
        @inject('PasswordsHistoryRepository')
        private passwordsHistoryRepository: IPasswordsHistoryRepository
    ) {}
    public async execute({ current_password, user_id }: ICreatePasswordHistory): Promise<PasswordsHistory> {
        const historyExists = await this.passwordsHistoryRepository.find(user_id);

        if (historyExists != null) {
            throw new AppError('This user already has a password history!');
        }

        const passwordsHistory = this.passwordsHistoryRepository.create({ 
            current_password: current_password,
            user_id: user_id
        });
        
        return passwordsHistory;
    }
}

export default CreatePasswordsHistoryService;