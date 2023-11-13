import mongoose, { HydratedDocument, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Timestamps } from '../../shared/entities/mongoose/base.interface';
import { USER, USER_VALIDATION } from './user.constants';
import { CreateUserDto } from './user.dto';
import environment from '../../shared/environment';
import { AppError } from '../../shared/server/http/app-error.util';
import { HttpCode } from '../../shared/server/http/http-code.util';

type UserBody = CreateUserDto['body'];

export interface IUser extends Timestamps, UserBody {}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserQuery = HydratedDocument<IUser & IUserMethods>;

// Note: Record<string, never> is used to avoid passing in {} as the type
type UserModelType = Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModelType, IUserMethods>(
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

userSchema.pre('save', async function (next) {
  const user = this as HydratedDocument<IUser>;

  if (!user.isModified('password')) {
    return next();
  }

  if (!environment.saltWorkFactor) {
    return next(
      new AppError(
        'Salt work factor is not defined',
        HttpCode.InternalServerError
      )
    );
  }

  const salt = await bcrypt.genSalt(parseInt(environment.saltWorkFactor));

  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt
    .compare(candidatePassword, this.password)
    .then((isMatch) => {
      return isMatch;
    })
    .catch(() => false);
};

const User = mongoose.model<IUser, UserModelType>(USER, userSchema);

export default User;
