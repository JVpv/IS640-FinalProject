import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { IPasswordsHistory } from "../../../domain/models/IPasswordsHistory";

@Entity('jose_password_history')
class PasswordsHistory implements IPasswordsHistory {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Exclude()
    current_password: string;
    
    @Column()
    previous_password_1: string | null;

    @Column()
    previous_password_2: string | null;

    @Column()
    previous_password_3: string | null;

    @Column()
    previous_password_4: string | null;

    @Column()
    previous_password_5: string | null;

    @Column()
    user_id: string;
}

export default PasswordsHistory;