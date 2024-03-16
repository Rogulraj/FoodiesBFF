import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { ReturnResponse } from '@/interfaces/returnResponse.interface';
import { CoreClient } from '@/utils/coreClient';
import { AxiosResponse } from 'axios';
import { logger } from '@/utils/logger';

export class UserService {
  public async findAllUser(): Promise<ReturnResponse<User[]>> {
    try {
      const coreClient = new CoreClient(3000).getCoreClient();

      const result: AxiosResponse = await coreClient.get('/web/users');

      const data: ReturnResponse<User[]> = result.data;

      return data;
    } catch (err) {
      const data = err?.response?.data;

      throw new HttpException(data?.statusCode, data?.message);
    }
  }

  public async findUserById(userId: string): Promise<ReturnResponse<User>> {
    try {
      const coreClient = new CoreClient(3000).getCoreClient();

      const result: AxiosResponse = await coreClient.get(`/web/users/${userId}`);

      const data: ReturnResponse<User> = result.data;

      return data;
    } catch (err) {
      const data = err?.response?.data;

      throw new HttpException(data?.statusCode, data?.message);
    }
  }

  public async createUser(userData: User): Promise<ReturnResponse<User>> {
    try {
      const coreClient = new CoreClient(3000).getCoreClient();

      const result: AxiosResponse = await coreClient.post(`/web/users`, userData);

      const data: ReturnResponse<User> = result.data;

      return data;
    } catch (err) {
      const data = err?.response?.data;

      throw new HttpException(data?.statusCode, data?.message);
    }
  }

  public async updateUser(userId: string, userData: User): Promise<ReturnResponse<User>> {
    try {
      const coreClient = new CoreClient(3000).getCoreClient();

      const result: AxiosResponse = await coreClient.put(`/web/users/${userId}`, userData);

      const data: ReturnResponse<User> = result.data;

      return data;
    } catch (err) {
      const data = err?.response?.data;

      throw new HttpException(data?.statusCode, data?.message);
    }
  }

  public async deleteUser(userId: string): Promise<ReturnResponse<User>> {
    try {
      const coreClient = new CoreClient(3000).getCoreClient();

      const result: AxiosResponse = await coreClient.delete(`/web/users/${userId}`);

      const data: ReturnResponse<User> = result.data;

      return data;
    } catch (err) {
      const data = err?.response?.data;

      throw new HttpException(data?.statusCode, data?.message);
    }
  }
}
