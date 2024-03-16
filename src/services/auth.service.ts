import { HttpException } from '@exceptions/httpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User, UserWithCookie } from '@interfaces/users.interface';
import { CoreClient } from '@/utils/coreClient';
import { ReturnResponse } from '@/interfaces/returnResponse.interface';
import { AxiosResponse } from 'axios';
import { getAuthorization } from '@/middlewares/auth.middleware';

export class AuthService {
  public async signup(userData: User): Promise<ReturnResponse<User>> {
    try {
      const coreClient = new CoreClient(3000).getCoreClient();

      const signupResult: AxiosResponse = await coreClient.post('/web/signup', userData);

      const data: ReturnResponse<User> = signupResult.data;

      return data;
    } catch (err) {
      const data = err?.response?.data;

      throw new HttpException(data?.statusCode, data?.message);
    }
  }

  public async login(userData: User): Promise<ReturnResponse<UserWithCookie>> {
    try {
      const coreClient = new CoreClient(3000).getCoreClient();

      const loginResult: AxiosResponse = await coreClient.post('/web/login', userData);

      const data: ReturnResponse<UserWithCookie> = loginResult.data;

      return data;
    } catch (err) {
      const data = err?.response?.data;

      throw new HttpException(data?.statusCode, data?.message);
    }
  }

  public async logout(userData: User, req: RequestWithUser): Promise<ReturnResponse<User>> {
    try {
      const token = getAuthorization(req);
      const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();

      const logoutResult: AxiosResponse = await coreClient.post('/web/logout');

      const data: ReturnResponse<User> = logoutResult.data;

      return data;
    } catch (err) {
      const data = err?.response?.data;

      throw new HttpException(data?.statusCode, data?.message);
    }
  }
}
