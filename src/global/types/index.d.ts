import { UserRole } from '../enum/user.role';

export interface JwtPayload {
  userId: number;
  role: UserRole;
  iat?: number;
  exp?: number;
}
export interface CommonResponseType {
  statusCode: number;
  message: string;
  data?: T;
  count?: number;
}
