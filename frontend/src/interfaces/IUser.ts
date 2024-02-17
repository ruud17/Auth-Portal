import { IPhoto } from './IPhoto';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  active: boolean;
  avatar: string;
  photos: IPhoto[];
  createdAt: Date;
  updatedAt: Date;
}
