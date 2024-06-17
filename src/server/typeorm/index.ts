import { DataSource } from "typeorm";

import User from "./modules/users/infra/typeorm/entities/User";
import { CreateJoseUser1718562796487 } from "./migrations/1718562796487-CreateJose_user";
import { AddUserIdToPasswordHistory1718578151274 } from "./migrations/1718578151274-AddUserIdToPasswordHistory";
import { CreateJosePasswordHistory1718589901368 } from "./migrations/1718589901368-CreateJose_Password_History";
import PasswordsHistory from "./modules/password_history/infra/typeorm/entities/PasswordsHistory";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "IS640",
  entities: [
    User, PasswordsHistory
  ],
  migrations: [
    CreateJoseUser1718562796487,
    CreateJosePasswordHistory1718589901368,
    AddUserIdToPasswordHistory1718578151274
  ],
});