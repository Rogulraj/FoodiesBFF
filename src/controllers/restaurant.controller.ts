import { RequestWithToken } from '@/interfaces/auth.interface';
import { CommonResponse, IdNameResponse } from '@/interfaces/commonResponse.interface';
import { RestaurantType } from '@/interfaces/restaurant.interface';
import { RestaurantService } from '@/services/restaurant.service';
import { Response, NextFunction } from 'express';

export class RestaurantController {
  public service = new RestaurantService();

  public createRestaurant = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      console.log('userData = ', userData);
      const token: string = req.token;

      const createRestaurantData: CommonResponse<RestaurantType> = await this.service.createRestaurant(userData, token);

      res.status(createRestaurantData.statusCode).json(createRestaurantData);
    } catch (error) {
      next(error);
    }
  };

  public addMenuType = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const token = req.token;

      const addMenuTypeData: CommonResponse<IdNameResponse> = await this.service.addMenuType(userData, token);

      res.status(addMenuTypeData.statusCode).json(addMenuTypeData);
    } catch (error) {
      next(error);
    }
  };

  public addMenuItem = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const token = req.token;

      const addMenuItemData: CommonResponse<IdNameResponse> = await this.service.addMenuItem(userData, token);

      res.status(addMenuItemData.statusCode).json(addMenuItemData);
    } catch (error) {
      next(error);
    }
  };
}
