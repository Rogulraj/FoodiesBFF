import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithToken, RequestWithUser } from '@interfaces/auth.interface';

export const getAuthorization = req => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return 'null';
};

export const SetTokenMiddleware = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const getToken = getAuthorization(req);
    req.token = getToken;
    next();
  } catch (error) {
    next(error);
  }
};

// export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
//   try {
//     const Authorization = getAuthorization(req);

//     if (Authorization) {
//       const { _id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
//       const findUser = await UserModel.findById(_id);

//       if (findUser) {
//         req.user = findUser;
//         next();
//       } else {
//         next(new HttpException(401, 'Wrong authentication token'));
//       }
//     } else {
//       next(new HttpException(404, 'Authentication token missing'));
//     }
//   } catch (error) {
//     next(new HttpException(401, 'Wrong authentication token'));
//   }
// };
