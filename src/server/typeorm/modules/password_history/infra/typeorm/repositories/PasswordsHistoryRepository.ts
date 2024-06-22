import { Repository } from "typeorm";
import { ICreatePasswordHistory } from "../../../domain/models/ICreatePasswordHistory";
import { IPasswordsHistory } from "../../../domain/models/IPasswordsHistory";
import { dataSource } from "../../../../..";
import { IPasswordsHistoryRepository } from "../../../domain/repositories/IPasswordsHistoryRepository";
import PasswordsHistory from "../entities/PasswordsHistory";

export default class PasswordsHistoryRepository implements IPasswordsHistoryRepository {
    
    private ormRepository: Repository<PasswordsHistory> 

    constructor() {
        this.ormRepository = dataSource.getRepository(PasswordsHistory);
    }

    public async find(user_id: string): Promise<PasswordsHistory | null> {
        const passwordsHistory = await this.ormRepository.findOne({
            where: {
                user_id: user_id
            }
        });

        return passwordsHistory;
    }

    public async create({ current_password, user_id }: ICreatePasswordHistory): Promise<PasswordsHistory> {
        const passwordsHistory = this.ormRepository.create({ 
            current_password: current_password, 
            user_id: user_id,
            previous_password_1: current_password,
            previous_password_2: current_password,
            previous_password_3: current_password,
            previous_password_4: current_password,
            previous_password_5: current_password 
        });

        await this.ormRepository.save(passwordsHistory);

        return passwordsHistory;
    }

    public async update(data: IPasswordsHistory): Promise<PasswordsHistory> {
        await this.ormRepository.save(data);

        return data;
    }

}