import { DataSource } from "typeorm";

import { CreateJoseUser1718471570863 } from "./migrations/1718471570863-CreateJose_user";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "IS640",
  entities: [],
  migrations: [
    CreateJoseUser1718471570863
  ],
});