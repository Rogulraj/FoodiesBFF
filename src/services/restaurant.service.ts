import { HttpException } from '@/exceptions/httpException';
import { CommonResponse, IdNameResponse } from '@/interfaces/commonResponse.interface';
import { AddMenuBody, MenuTypeItem, RestaurantType } from '@/interfaces/restaurant.interface';
import { CoreClient } from '@/utils/coreClient';
import axios, { AxiosError, AxiosResponse } from 'axios';

export class RestaurantService {
  public async createRestaurant(userData: RestaurantType, token: string): Promise<CommonResponse<RestaurantType>> {
    try {
      const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
      const createData: AxiosResponse = await coreClient.post('/web/restaurant/create', userData);

      const data: CommonResponse<RestaurantType> = createData.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<CommonResponse<{}>> = error;
        const axiosData = axiosError?.response?.data;
        throw new HttpException(axiosData?.statusCode, axiosData?.message);
      }
      throw new HttpException(500, error.message);
    }
  }

  public async getAllRestaurants(token: string): Promise<CommonResponse<RestaurantType[]>> {
    try {
      const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
      const fetchData: AxiosResponse = await coreClient.get('/web/restaurant/');

      const data: CommonResponse<RestaurantType[]> = fetchData.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<CommonResponse<{}>> = error;
        const axiosData = axiosError?.response?.data;
        throw new HttpException(axiosData?.statusCode, axiosData?.message);
      }
      throw new HttpException(500, error.message);
    }
  }

  public async getRestaurantById(restaurantId: string, token: string): Promise<CommonResponse<RestaurantType>> {
    try {
      const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
      const fetchData: AxiosResponse = await coreClient.get(`/web/restaurant/${restaurantId}`);

      const data: CommonResponse<RestaurantType> = fetchData.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<CommonResponse<{}>> = error;
        const axiosData = axiosError?.response?.data;
        throw new HttpException(axiosData?.statusCode, axiosData?.message);
      }
      throw new HttpException(500, error.message);
    }
  }

  public async addMenuType(userData, token: string) {
    try {
      const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
      const addData: AxiosResponse = await coreClient.put('/web/restaurant/add-menu-type', userData);

      const data: CommonResponse<IdNameResponse> = addData.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<CommonResponse<{}>> = error;
        const axiosData = axiosError?.response?.data;
        throw new HttpException(axiosData?.statusCode, axiosData?.message);
      }
      throw new HttpException(500, error.message);
    }
  }

  public async addMenuItem(userData: AddMenuBody, token: string) {
    try {
      const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
      const addData: AxiosResponse = await coreClient.put('/web/restaurant/add-menu-item', userData);

      const data: CommonResponse<IdNameResponse> = addData.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<CommonResponse<{}>> = error;
        const axiosData = axiosError?.response?.data;
        throw new HttpException(axiosData?.statusCode, axiosData?.message);
      }
      throw new HttpException(500, error.message);
    }
  }

  public async getFoodById(foodId: string, restaurantId: string, category: string, token: string): Promise<CommonResponse<MenuTypeItem>> {
    try {
      const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
      const foodData: AxiosResponse = await coreClient.get(`/web/restaurant/food/${foodId}?restaurantId=${restaurantId}&category=${category}`);

      const data: CommonResponse<MenuTypeItem> = foodData.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<CommonResponse<{}>> = error;
        const axiosData = axiosError?.response?.data;
        throw new HttpException(axiosData?.statusCode, axiosData?.message);
      }
      throw new HttpException(500, error.message);
    }
  }
}
