import { Exclude, Expose } from 'class-transformer';
import { Photo } from 'modules/users/entities/photo.entity';

@Exclude()
export class RegisterClientResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  active: boolean;

  @Expose()
  avatar: string;

  @Expose()
  photos: Photo[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  password: string;
}
