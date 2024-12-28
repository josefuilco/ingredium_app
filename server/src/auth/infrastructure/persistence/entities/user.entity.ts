import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false
  })
  names: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false
  })
  surnames: string;

  @Column({
    type: 'varchar',
    length: 9,
    unique: true,
    nullable: false
  })
  cellphone: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false
  })
  nacionality: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;
}