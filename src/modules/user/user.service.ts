import { FilterQuery, HydratedDocument } from 'mongoose';
import { CreateUserDto } from './user.dto';
import User, { IUser, UserQuery } from './user.model';

export function createUser(
  input: CreateUserDto['body']
): HydratedDocument<IUser> {
  return new User(input);
}

export function findUser(
  query: FilterQuery<IUser>
): Promise<HydratedDocument<UserQuery> | null> {
  return User.findOne(query).exec();
}
