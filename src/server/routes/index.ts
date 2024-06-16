import { Router } from "express";
import usersRouter from "../typeorm/modules/users/infra/http/routes/user.routes";

const routes = Router();

routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
    return response.json({ message: "Hello World!" });
});

export default routes;