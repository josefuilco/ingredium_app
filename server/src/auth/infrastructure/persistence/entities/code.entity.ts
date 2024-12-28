import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('codes')
export class CodeEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 6
  })
  code: string;

  @Column({
    type: 'uuid',
    nullable: false,
    unique: true
  })
  userId: string;
}