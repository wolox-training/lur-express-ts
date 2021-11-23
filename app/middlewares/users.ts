import { ClassType } from 'class-transformer-validator';
import { NextFunction, Request, Response } from 'express';
import { usersValidations } from '../utils/usersValidations';

export function usersHandleMiddleware<T extends object>(
  classType: ClassType<T>,
  errorCode: number
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validationErrors = await usersValidations(classType, req);
    if (validationErrors) {
      res.status(errorCode).json({ message: 'user validations failed!', errors: validationErrors });
    } else {
      next();
    }
  };
}
