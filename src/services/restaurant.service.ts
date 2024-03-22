import { CommonResponse, IdNameResponse } from '@/interfaces/commonResponse.interface';
import { AddMenuBody, RestaurantType } from '@/interfaces/restaurant.interface';
import { CoreClient } from '@/utils/coreClient';
import { AxiosResponse } from 'axios';

export class RestaurantService {
  public async createRestaurant(userData: RestaurantType, token: string): Promise<CommonResponse<RestaurantType>> {
    const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
    const createData: AxiosResponse = await coreClient.post('/web/restaurant/create', userData);

    const data: CommonResponse<RestaurantType> = createData.data;
    return data;
  }

  public async addMenuType(userData, token: string) {
    const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
    const addData: AxiosResponse = await coreClient.put('/web/restaurant/add-menu-type', userData);

    const data: CommonResponse<IdNameResponse> = addData.data;
    return data;
  }

  public async addMenuItem(userData: AddMenuBody, token: string) {
    const coreClient = new CoreClient(3000, { Authorization: `Bearer ${token}` }).getCoreClient();
    const addData: AxiosResponse = await coreClient.put('/web/restaurant/add-menu-item', userData);

    const data: CommonResponse<IdNameResponse> = addData.data;
    return data;
  }
}
