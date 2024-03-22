import { RestaurantController } from '@/controllers/restaurant.controller';
import { SetTokenMiddleware } from '@/middlewares/auth.middleware';
import { FormidableMiddleware } from '@/middlewares/formidable.middleware';
import { SetUpMulterWithStorage } from '@/middlewares/multer.middleware';
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
    this.router.put(`${this.path}/add-menu-type`, SetTokenMiddleware, this.controller.addMenuType);
    this.router.put(`${this.path}/add-menu-item`, SetTokenMiddleware, this.controller.addMenuItem);
  }
}
