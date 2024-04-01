import { RequestWithToken } from '@/interfaces/auth.interface';
import { CommonResponse, IdNameResponse, IdResponse } from '@/interfaces/commonResponse.interface';
import { AddMenuBody, MenuCategoryItems, MenuType, RestaurantType } from '@/interfaces/restaurant.interface';
import { RestaurantService } from '@/services/restaurant.service';
import { Response, NextFunction } from 'express';

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

  public updateRestaurant = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const token = req.token;
      const userData: Partial<RestaurantType> = req.body;

      const updateData = await this.service.updateRestaurant(userData, token);
      res.status(updateData.statusCode).json(updateData);
    } catch (error) {
      next(error);
    }
  };

  public addMenuCategory = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const userData: AddMenuBody = req.body;
      const token = req.token;

      const addMenuTypeData: CommonResponse<IdNameResponse> = await this.service.addMenuCategory(userData, token);

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

  public getAllMenuItems = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const token = req.token;

      const menuItemsList: CommonResponse<MenuType[]> = await this.service.getAllMenuItems(token);
      res.status(menuItemsList.statusCode).json(menuItemsList);
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

      const foodData: CommonResponse<MenuCategoryItems> = await this.service.getFoodById(foodId, restaurantId, category, token);
      res.status(foodData.statusCode).json(foodData);
    } catch (error) {
      next(error);
    }
  };

  public updateFoodById = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const foodId = req.params.id;
      const restaurantId = req.body.restaurantId;
      const categoryId = req.body.categoryId;
      const item = req.body.item;
      const token = req.token;

      const updateData: CommonResponse<IdResponse> = await this.service.updateFoodById(foodId, restaurantId, categoryId, item, token);
      res.status(updateData.statusCode).json(updateData);
    } catch (error) {
      next(error);
    }
  };

  public removeFoodById = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const token = req.token;
      const foodId = req.params.id;
      const restaurantId = req.body.restaurantId;
      const categoryId = req.body.categoryId;

      const deleteData: CommonResponse<IdResponse> = await this.service.removeFoodById(foodId, restaurantId, categoryId, token);
      res.status(deleteData.statusCode).json(deleteData);
    } catch (error) {
      next(error);
    }
  };

  public removeMenuCategory = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const token = req.token;
      const categoryId = req.params.id;

      const removeData: CommonResponse<MenuType> = await this.service.removeMenuCategory(categoryId, token);
      res.status(removeData.statusCode).json(removeData);
    } catch (error) {
      next(error);
    }
  };
}
