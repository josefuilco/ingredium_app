import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('codes')
export class CodeEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 6
  })
  code: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 36,
    nullable: false,
    unique: true
  })
  userId: string;
}