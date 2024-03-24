import { RestaurantController } from '@/controllers/restaurant.controller';
import { CategoryQueryDto, IdParamDto } from '@/dtos/restaurant.dto';
import { SetTokenMiddleware } from '@/middlewares/auth.middleware';
import { SetUpMulterWithStorage } from '@/middlewares/multer.middleware';
import { ParamsValidationMiddelware, QueryValidationMiddelware, ValidationMiddleware } from '@/middlewares/validation.middleware';
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
    this.router.post(`${this.path}/create`, SetTokenMiddleware, this.controller.createRestaurant);
    this.router.get(`${this.path}/`, SetTokenMiddleware, this.controller.getAllRestaurants);
    this.router.get(`${this.path}/:id`, SetTokenMiddleware, this.controller.getRestaurantById);
    this.router.put(`${this.path}/add-menu-type`, SetTokenMiddleware, this.controller.addMenuType);
    this.router.put(`${this.path}/add-menu-item`, SetTokenMiddleware, this.controller.addMenuItem);

    // this route receive query ?category=
    this.router.get(
      `${this.path}/food/:id`,
      ParamsValidationMiddelware(IdParamDto),
      QueryValidationMiddelware(CategoryQueryDto),
      SetTokenMiddleware,
      this.controller.getFoodById,
    );
  }
}
