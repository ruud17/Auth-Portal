import {
  BeforeInsert,
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsEmail, IsNotEmpty, Matches, IsUrl } from 'class-validator';
import { Photo } from './photo.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 25)
  firstName: string;

  @Column()
  @Length(10, 20)
  lastName: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @Length(6, 50)
  @Matches(/^(?=.*\d).{6,}$/, {
    message: 'Password must contain at least one number',
  })
  password: string;

  @Column()
  role: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Lifecycle hook to automatically generate the full name before inserting into the database
  @BeforeInsert()
  generateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}

@ChildEntity()
export class Client extends User {
  @Column()
  @IsUrl()
  @IsNotEmpty()
  avatar: string;

  @OneToMany(() => Photo, (photo) => photo.client, {
    cascade: true,
    eager: true,
  })
  photos: Photo[];
}
