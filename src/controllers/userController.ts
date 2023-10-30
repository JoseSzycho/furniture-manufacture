import userServices from '../services/userServices';
import { Request, Response, NextFunction } from 'express';
import { ICRUDController } from '../types/ICRUDController';
import { CRUDController } from './helpers/CRUDController';

class UserController {
  private CRUDController: ICRUDController;
  constructor() {
    this.CRUDController = new CRUDController(userServices);
  }
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    await this.CRUDController.create(req, res, next);
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    await this.CRUDController.getAll(req, res, next);
  };

  getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    await this.CRUDController.getOne(req, res, next);
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    await this.CRUDController.update(req, res, next);
  };
}

export default new UserController();