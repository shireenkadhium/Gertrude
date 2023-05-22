import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'settings',
})
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  property: string;

  @Column()
  value: string;
}
