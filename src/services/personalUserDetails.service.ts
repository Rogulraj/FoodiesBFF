import { HttpException } from '@/exceptions/httpException';
import { CommonResponse, IdResponse } from '@/interfaces/commonResponse.interface';
import { PersonalUserDetails } from '@/interfaces/personalUserDetails';
import { CoreClient } from '@/utils/coreClient';
import axios, { AxiosError, AxiosResponse } from 'axios';

export class PersonalUserDetailsService {
  public async createUserDetails(userData: PersonalUserDetails): Promise<CommonResponse<IdResponse>> {
    try {
      const coreClient = new CoreClient(10000).getCoreClient();
      const axiosResponse: AxiosResponse = await coreClient.post(`/web/personal/user-details/create`, userData);

      const data: CommonResponse<IdResponse> = axiosResponse.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<CommonResponse<{}>> = error;
        const axiosData = axiosError.response.data;
        throw new HttpException(axiosData?.statusCode, axiosData?.message);
      }
      throw new HttpException(500, error.message);
    }
  }

  public async getUserDetailsById(userId: string, token: string): Promise<CommonResponse<PersonalUserDetails>> {
    try {
      const coreClient = new CoreClient(5000, { Authorization: `Bearer ${token}` }).getCoreClient();
      const axiosResponse: AxiosResponse = await coreClient.get(`/web/personal/user-details/get/${userId}`);

      const data: CommonResponse<PersonalUserDetails> = axiosResponse.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<CommonResponse<{}>> = error;
        const axiosData = axiosError.response.data;
        throw new HttpException(axiosData?.statusCode, axiosData?.message);
      }
      throw new HttpException(500, error.message);
    }
  }
}
