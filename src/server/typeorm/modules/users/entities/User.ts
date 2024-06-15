import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../domain/models/IUser";

@Entity('jose_user')
class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}

export default User;