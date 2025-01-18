import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecipeEntity } from "./recipe.entity";

@Entity('steps')
export class StepEntity {
  @PrimaryGeneratedColumn({ name: 'step_id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50
  })
  content: string;

  @ManyToOne(() => RecipeEntity, recipe => recipe.steps, { createForeignKeyConstraints: false, })
  @JoinColumn({ name: 'recipe_id' })
  recipe: RecipeEntity;
}