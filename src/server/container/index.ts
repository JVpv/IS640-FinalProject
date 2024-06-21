import { container } from 'tsyringe';
import { IUsersRepository } from '../typeorm/modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '../typeorm/modules/users/infra/typeorm/repositories/UsersRepository';
import { IPasswordsHistoryRepository } from '../typeorm/modules/password_history/domain/repositories/IPasswordsHistoryRepository';
import PasswordsHistoryRepository from '../typeorm/modules/password_history/infra/typeorm/repositories/PasswordsHistoryRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPasswordsHistoryRepository>(
  'PasswordsHistoryRepository',
  PasswordsHistoryRepository,
);