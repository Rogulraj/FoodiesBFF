import { PersonalUserDetailsController } from '@/controllers/personalUserDetails.controller';
import { IdParamDto } from '@/dtos/restaurant.dto';
import { SetTokenMiddleware } from '@/middlewares/auth.middleware';
import { ParamsValidationMiddelware } from '@/middlewares/validation.middleware';
import express, { Router } from 'express';

export class PersonalUserDetailsRoute {
  public router: Router = express.Router();
  public path: string = `/web/personal`;
  public controller: PersonalUserDetailsController = new PersonalUserDetailsController();

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    /** POST */
    this.router.post(`${this.path}/user-details/create`, this.controller.createUserDetails);

    /** GET */
    this.router.get(
      `${this.path}/user-details/get/:id`,
      SetTokenMiddleware,
      ParamsValidationMiddelware(IdParamDto),
      this.controller.getUserDetailsById,
    );
  }
}
