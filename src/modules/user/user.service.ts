import { FilterQuery, HydratedDocument, Query } from 'mongoose';
import { CreateUserDto } from './user.dto';
import User, { IUser } from './user.model';

export function createUser(
  input: CreateUserDto['body']
): HydratedDocument<IUser> {
  return new User(input);
}

export function findUser(
  query: FilterQuery<IUser>
): Query<IUser | null, IUser> {
  return User.findOne(query);
}
