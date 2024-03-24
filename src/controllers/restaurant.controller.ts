import { RequestWithToken } from '@/interfaces/auth.interface';
import { CommonResponse, IdNameResponse } from '@/interfaces/commonResponse.interface';
import { MenuTypeItem, RestaurantType } from '@/interfaces/restaurant.interface';
import { RestaurantService } from '@/services/restaurant.service';
import { Response, NextFunction, Request } from 'express';

export class RestaurantController {
  public service = new RestaurantService();

  public createRestaurant = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const token: string = req.token;

      const createRestaurantData: CommonResponse<RestaurantType> = await this.service.createRestaurant(userData, token);

      res.status(createRestaurantData.statusCode).json(createRestaurantData);
    } catch (error) {
      next(error);
    }
  };

  public getAllRestaurants = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const token: string = req.token;
      const restaurantsList: CommonResponse<RestaurantType[]> = await this.service.getAllRestaurants(token);

      res.status(restaurantsList.statusCode).json(restaurantsList);
    } catch (error) {
      next(error);
    }
  };

  public getRestaurantById = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const { id: restaurantId } = req.params;
      const token: string = req.token;
      const restaurantData: CommonResponse<RestaurantType> = await this.service.getRestaurantById(restaurantId, token);

      res.status(restaurantData.statusCode).json(restaurantData);
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

  public getFoodById = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const foodId = req.params.id;
      const restaurantId = req.query.restaurantId as string;
      const category = req.query.category as string;
      const token = req.token;

      const foodData: CommonResponse<MenuTypeItem> = await this.service.getFoodById(foodId, restaurantId, category, token);
      res.status(foodData.statusCode).json(foodData);
    } catch (error) {
      next(error);
    }
  };
}
