import { Repository } from "typeorm";
import User from "../entities/User";
import { dataSource } from "../../../../..";
import { IUsersRepository } from "../../../domain/repositories/IUsersRepository";
import { ICreateUser } from "../../../domain/models/ICreateUser";
import { IUser } from "../../../domain/models/IUser";

export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User> 

    constructor() {
        this.ormRepository = dataSource.getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                email: email
            }
        });

        return user;
    }

    public async create({ name, email, password }: ICreateUser): Promise<User> {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: IUser): Promise<User> {
        await this.ormRepository.save(user);

        return user;
    }
}