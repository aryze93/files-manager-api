import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', length: 70, nullable: false, unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;
}
