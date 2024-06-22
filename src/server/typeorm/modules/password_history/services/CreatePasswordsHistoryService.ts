import { inject, injectable } from 'tsyringe';
import { ICreatePasswordHistory } from "../domain/models/ICreatePasswordHistory";
import PasswordsHistory from "../infra/typeorm/entities/PasswordsHistory";
import { IPasswordsHistoryRepository } from "../domain/repositories/IPasswordsHistoryRepository";

@injectable()
class CreatePasswordsHistoryService {
    constructor(
        @inject('PasswordsHistoryRepository')
        private passwordsHistoryRepository: IPasswordsHistoryRepository
    ) {}
    public async execute({ current_password, user_id }: ICreatePasswordHistory): Promise<PasswordsHistory> {   
        const passwordsHistory = this.passwordsHistoryRepository.create({ 
            current_password: current_password,
            user_id: user_id
        });
        
        return passwordsHistory;
    }
}

export default CreatePasswordsHistoryService;