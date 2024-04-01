import { RestaurantController } from '@/controllers/restaurant.controller';
import { CategoryQueryDto, CategoryRestaurantIdDto, IdParamDto, RestaurantDto, UpdateFoodItemDto } from '@/dtos/restaurant.dto';
import { SetTokenMiddleware } from '@/middlewares/auth.middleware';
import { SetUpMulterWithStorage } from '@/middlewares/multer.middleware';
import { ParamsValidationMiddelware, QueryValidationMiddelware, BodyValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';
import path from 'path';

export class RestaurantRoute {
  public path = '/web/restaurant';
  public router = Router();
  public controller = new RestaurantController();
  public multer = SetUpMulterWithStorage(path.join(__dirname, '../assets'));

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    /** GET */
    this.router.get(`${this.path}/menu-items`, SetTokenMiddleware, this.controller.getAllMenuItems);
    this.router.get(`${this.path}/:id`, SetTokenMiddleware, this.controller.getRestaurantById);
    this.router.get(`${this.path}/`, SetTokenMiddleware, this.controller.getAllRestaurants);

    /** POST */
    this.router.post(`${this.path}/create`, SetTokenMiddleware, this.controller.createRestaurant);

    /** PUT */
    this.router.put(`${this.path}/update`, BodyValidationMiddleware(RestaurantDto, true), SetTokenMiddleware, this.controller.updateRestaurant);
    this.router.put(`${this.path}/add-menu-category`, SetTokenMiddleware, this.controller.addMenuCategory);
    this.router.put(`${this.path}/add-menu-item`, SetTokenMiddleware, this.controller.addMenuItem);
    this.router.put(
      `${this.path}/food/update/:id`,
      ParamsValidationMiddelware(IdParamDto),
      BodyValidationMiddleware(UpdateFoodItemDto),
      SetTokenMiddleware,
      this.controller.updateFoodById,
    );

    // this route receive query ?category=
    this.router.get(
      `${this.path}/food/:id`,
      ParamsValidationMiddelware(IdParamDto),
      QueryValidationMiddelware(CategoryQueryDto),
      SetTokenMiddleware,
      this.controller.getFoodById,
    );

    /** DELETE */
    this.router.delete(
      `${this.path}/food/remove-category/:id`,
      SetTokenMiddleware,
      ParamsValidationMiddelware(IdParamDto),
      this.controller.removeMenuCategory,
    );
    this.router.delete(
      `${this.path}/food/remove-food/:id`,
      SetTokenMiddleware,
      ParamsValidationMiddelware(IdParamDto),
      BodyValidationMiddleware(CategoryRestaurantIdDto),
      this.controller.removeFoodById,
    );
  }
}
