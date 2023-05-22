import { User } from '../users/entities/user.entity';

export type RequestWithUser = Request & { user: User };

export type AuthorizationRequest = Request & {
  headers: {
    authorization: string;
  };
};
