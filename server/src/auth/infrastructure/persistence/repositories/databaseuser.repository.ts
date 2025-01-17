import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository.port';
import { User } from '../../../domain/models/user.model';
import { UserBuilder } from '../../../domain/builders/user.builder';

export class DatabaseUserRepository implements IUserRepository {
  constructor(
    private readonly userEntity: Repository<UserEntity>,
    private readonly userBuilder: UserBuilder
  ) {}

  async findById(id: string): Promise<User> {
    const userFound = await this.userEntity.findOne({
      where: {
        id,
        isActive: true
      }
    });

    if (!userFound)
      return;

    const user = this.userBuilder
      .addId(userFound.id)
      .addNames(userFound.names)
      .addSurnames(userFound.surnames)
      .addCellphone(userFound.cellphone)
      .addNacionality(userFound.nacionality)
      .addEmail(userFound.email)
      .build();
    return user;
  }

  async findByCellphone(cellphone: string): Promise<User> {
    const userFound = await this.userEntity.findOne({
      where: {
        cellphone,
        isActive: true
      }
    });

    if (!userFound)
      return;

    const user = this.userBuilder
      .addId(userFound.id)
      .addNames(userFound.names)
      .addSurnames(userFound.surnames)
      .addCellphone(userFound.cellphone)
      .addNacionality(userFound.nacionality)
      .addEmail(userFound.email)
      .build();
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const userFound = await this.userEntity.findOne({
      where: {
        email,
        isActive: true
      }
    });

    if (!userFound)
      return;

    const user = this.userBuilder
      .addId(userFound.id)
      .addNames(userFound.names)
      .addSurnames(userFound.surnames)
      .addCellphone(userFound.cellphone)
      .addNacionality(userFound.nacionality)
      .addEmail(userFound.email)
      .build();
    
    return user;
  }

  async save(user: User): Promise<boolean> {
    const userCreated = await this.userEntity.save({
      id: user.getId(),
      names: user.getNames(),
      surnames: user.getSurnames(),
      cellphone: user.getCellphone(),
      email: user.getEmail(),
      nacionality: user.getNacionality()
    });
    return userCreated !== undefined;
  }

  async update(user: User): Promise<boolean> {
    const userUpdated = await this.userEntity.update({
      id: user.getId()
    }, {
      names: user.getNames(),
      surnames: user.getSurnames(),
      cellphone: user.getCellphone(),
      email: user.getEmail(),
      nacionality: user.getNacionality()
    });
    return userUpdated.affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    const userRemoved = await this.userEntity.update({
      id
    }, {
      isActive: false
    });
    return userRemoved.affected > 0;
  }
}