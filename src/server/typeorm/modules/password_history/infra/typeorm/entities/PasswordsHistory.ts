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
    
    @Column({ type: 'varchar' })
    previous_password_1: string;

    @Column({ type: 'varchar' })
    previous_password_2: string;

    @Column({ type: 'varchar' })
    previous_password_3: string;

    @Column({ type: 'varchar' })
    previous_password_4: string;

    @Column({ type: 'varchar' })
    previous_password_5: string;

    @Column()
    user_id: string;
}

export default PasswordsHistory;