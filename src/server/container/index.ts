import { container } from 'tsyringe';
import { IUsersRepository } from '../typeorm/modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '../typeorm/modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);