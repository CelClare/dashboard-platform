import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';

// Stockage DB et gestion des utilisateurs

@Entity()
export class User {

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$argon2')) {
      this.password = await argon2.hash(this.password);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, transformer: {
    to: (value: string) => value.toLowerCase(),
    from: (value: string) => value
  } })
  email: string;

  @Column()
  @Exclude() // Exclut le champ password des réponses API
  password: string;

  @Column({ default: 'USER' })
  role: string;

  

}