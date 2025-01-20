import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ingredients')
export class IngredientEntity {
  @PrimaryGeneratedColumn({ name: 'ingredient_id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50
  })
  description: string;

  @Column({
    type: 'int'
  })
  calories: number;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true
  })
  isActive: boolean;
}