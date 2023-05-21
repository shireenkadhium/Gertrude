import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'indexes' })
export class Index {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
