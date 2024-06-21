import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PasswordsHistoryController from '../controllers/PasswordsHistoryController';

const passwordsRouter = Router();
const passwordsController = new PasswordsHistoryController();

passwordsRouter.get('/:user_id', 
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().required()
        }
    }),
    passwordsController.find
);

passwordsRouter.post('/', 
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.string().required(),
            current_password: Joi.string().required()
        }
    }), 
    passwordsController.create
);

passwordsRouter.put('/',
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.string().required(),
            current_password: Joi.string().required(),
            previous_password_1: Joi.string().required(),
            previous_password_2: Joi.string(),
            previous_password_3: Joi.string(),
            previous_password_4: Joi.string(),
            previous_password_5: Joi.string()
        }
    }),
    passwordsController.save
);

export default passwordsRouter;