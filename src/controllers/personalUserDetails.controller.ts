import { RequestWithToken } from '@/interfaces/auth.interface';
import { CommonResponse, IdResponse } from '@/interfaces/commonResponse.interface';
import { PersonalUserDetails } from '@/interfaces/personalUserDetails';
import { PersonalUserDetailsService } from '@/services/personalUserDetails.service';
import { NextFunction, Request, Response } from 'express';

export class PersonalUserDetailsController {
  private service = new PersonalUserDetailsService();

  public createUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: PersonalUserDetails = req.body;
      const createdData: CommonResponse<IdResponse> = await this.service.createUserDetails(userData);

      res.status(createdData.statusCode).json(createdData);
    } catch (error) {
      next(error);
    }
  };

  public getUserDetailsById = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const token = req.token;
      const userDetails: CommonResponse<PersonalUserDetails> = await this.service.getUserDetailsById(userId, token);

      res.status(userDetails.statusCode).json(userDetails);
    } catch (error) {
      next(error);
    }
  };
}
