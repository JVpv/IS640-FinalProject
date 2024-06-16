import { DataSource } from "typeorm";

import User from "./modules/users/infra/typeorm/entities/User";
import { CreateJoseUser1718562796487 } from "./migrations/1718562796487-CreateJose_user";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "IS640",
  entities: [
    User
  ],
  migrations: [
    CreateJoseUser1718562796487
  ],
});