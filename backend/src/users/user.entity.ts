import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// (stockage DB)

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true }) // Email doit être unique
  email: string;

  @Column()
  password: string;

  @Column({ default: 'USER' })
  role: string;

}