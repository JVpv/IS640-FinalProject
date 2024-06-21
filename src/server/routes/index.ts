import { Router } from "express";
import usersRouter from "../typeorm/modules/users/infra/http/routes/user.routes";
import passwordsRouter from "../typeorm/modules/password_history/infra/http/routes/passwords.routes";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/passwords', passwordsRouter);

routes.get('/', (request, response) => {
    return response.json({ message: "Hello World!" });
});

export default routes;