import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/createuser.usecase";
import { UserBuilder } from "../../domain/builders/user.builder";
import { userDto } from "../dtos/user.dto";
import { FindUserByIdUseCase } from "../../application/use-cases/finduserbyid.usecase";
import { UpdateUserUseCase } from "../../application/use-cases/updateuser.usecase";
import { DeleteUserUseCase } from "../../application/use-cases/deleteuser.usecase";
import { UserRequest } from "../requests/user.request";

export class UserController {
  constructor(
    private readonly userBuilder: UserBuilder,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  async findUserById(
    req: UserRequest,
    res: Response
  ) {
    try {
      const user = await this.findUserByIdUseCase.execute(req.userId);
      res.status(200).json({
        message: 'User found.',
        data: user
      });
    } catch (error) {
      if (error instanceof Error) res.status(400).json({
        message: error.message,
        data: null
      });
    }
  }

  async createUser(
    req: Request,
    res: Response
  ) {
    try {
      const user = await userDto.parseAsync(req.body);
      const currentUser = this.userBuilder
        .addId(user.id)
        .addNames(user.names)
        .addSurnames(user.surnames)
        .addCellphone(user.cellphone)
        .addEmail(user.email)
        .addNacionality(user.nacionality)
        .build();
      const isCreated = await this.createUserUseCase.execute(currentUser);
      
      if (!isCreated) {
        res.status(500).json({
          message: 'User not created.',
          success: isCreated
        });
        return;
      }

      res.status(200).json({
        message: 'User created.',
        success: isCreated
      });
    } catch (error) {
      if (error instanceof Error) res.status(400).json({
        message: error.message,
        success: false
      });
    }
  }

  async updateUser(
    req: Request,
    res: Response
  ) {
    try {
      const user = await userDto.parseAsync(req.body);
      const currentUser = this.userBuilder
        .addId(user.id)
        .addNames(user.names)
        .addSurnames(user.surnames)
        .addCellphone(user.cellphone)
        .addEmail(user.email)
        .addNacionality(user.nacionality)
        .build();

      const isUpdated = await this.updateUserUseCase.execute(currentUser);

      if (!isUpdated) {
        res.status(500).json({
          message: 'User not updated.',
          success: isUpdated
        });
        return;
      }

      res.status(200).json({
        message: 'User updated.',
        success: isUpdated
      });
    } catch (error) {
      if (error instanceof Error) res.status(400).json({
        message: error.message,
        success: false
      });
    }
  }

  async deleteUser(
    req: UserRequest,
    res: Response
  ) {
    try {
      const userId = req.userId;
      const isRemoved = await this.deleteUserUseCase.execute(userId);

      if (!isRemoved) {
        res.status(500).json({
          message: 'User not deleted.',
          success: isRemoved
        });
        return;
      }

      res.status(200).json({
        message: 'User deleted.',
        success: isRemoved
      });
    } catch (error) {
      if (error instanceof Error) res.status(400).json({
        message: error.message,
        success: false
      });
    }
  }
}