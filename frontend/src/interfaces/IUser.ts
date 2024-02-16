import { IPhoto } from "./IPhoto";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    photos: IPhoto[]
}