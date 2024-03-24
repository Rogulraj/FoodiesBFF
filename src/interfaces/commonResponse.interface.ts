export interface CommonResponse<DataType> {
  statusCode: number;
  data: DataType;
  message: string;
}

export interface IdNameResponse {
  _id: string;
  name: string;
}
