import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import Role from '../roles/role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles: Role[];

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;
}
