import { AxiosError } from 'axios';

export interface CommonResponse<DataType> {
  statusCode: number;
  data: DataType;
  message: string;
}

export interface IdNameResponse {
  _id: string;
  name: string;
}

// export interface CustomAxiosError extends AxiosError {
//   response
// }
