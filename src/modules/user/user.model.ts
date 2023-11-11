import mongoose from 'mongoose';
import { Timestamps } from '../../shared/entities/mongoose/base.interface';
import { USER, USER_VALIDATION } from './user.constants';
import { CreateUserDto } from './user.dto';

type UserBody = CreateUserDto['body'];

export interface IUser extends Timestamps, UserBody {}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [
        USER_VALIDATION.NAME.REQUIRED.VALUE,
        USER_VALIDATION.NAME.REQUIRED.MESSAGE
      ],
      maxlength: [
        USER_VALIDATION.NAME.MAX_LENGTH.VALUE,
        USER_VALIDATION.NAME.MAX_LENGTH.MESSAGE
      ],
      trim: true
    },
    email: {
      type: String,
      required: [
        USER_VALIDATION.EMAIL.REQUIRED.VALUE,
        USER_VALIDATION.EMAIL.REQUIRED.MESSAGE
      ],
      maxlength: [
        USER_VALIDATION.EMAIL.MAX_LENGTH.VALUE,
        USER_VALIDATION.EMAIL.MAX_LENGTH.MESSAGE
      ],
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: USER_VALIDATION.EMAIL.INVALID.MESSAGE
      },
      trim: true
    },
    password: {
      type: String,
      required: [
        USER_VALIDATION.PASSWORD.REQUIRED.VALUE,
        USER_VALIDATION.PASSWORD.REQUIRED.MESSAGE
      ],
      minlength: [
        USER_VALIDATION.PASSWORD.MIN_LENGTH.VALUE,
        USER_VALIDATION.PASSWORD.MIN_LENGTH.MESSAGE
      ],
      maxlength: [
        USER_VALIDATION.PASSWORD.MAX_LENGTH.VALUE,
        USER_VALIDATION.PASSWORD.MAX_LENGTH.MESSAGE
      ],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model<IUser>(USER, userSchema);

export default User;
