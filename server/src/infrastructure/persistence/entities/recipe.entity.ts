import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { StepEntity } from "./step.entity";
import { IngredientEntity } from "./ingredient.entity";
import { UserEntity } from "./user.entity";

@Entity('recipes')
export class RecipeEntity {
  @PrimaryColumn({
    name: 'recipe_id',
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 50
  })
  name: string;

  @Column({
    name: 'owner_id',
    type: 'varchar',
    length: 36
  })
  ownerId: string;

  @OneToMany(() => StepEntity, step => step.recipe)
  steps: StepEntity[];

  @ManyToMany(() => IngredientEntity, { createForeignKeyConstraints: false })
  @JoinTable({
    name: 'ingredient_to_recipe',
    joinColumn: { name: 'recipe_id' },
    inverseJoinColumn: { name: 'ingredient_id' }
  })
  ingredients: IngredientEntity[];

  @ManyToMany(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinTable({
    name: 'user_to_recipe',
    joinColumn: { name: 'recipe_id' },
    inverseJoinColumn: { name: 'user_id' }
  })
  users: UserEntity[];
}