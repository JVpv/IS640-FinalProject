export interface IPasswordsHistory {
    id: string;
    current_password: string;
    previous_password_1: string | null;
    previous_password_2: string | null;
    previous_password_3: string | null;
    previous_password_4: string | null;
    previous_password_5: string | null;
    user_id: string;
}