import { CORE_PORT, CORE_HOST, CORE_END_POINT } from '@config';
import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios';

export class CoreClient {
  public baseUrl: string;
  public timeout: number;
  public headers: RawAxiosRequestHeaders;

  constructor(timeout?: number, headers?: RawAxiosRequestHeaders) {
    this.baseUrl = `${CORE_HOST}:${CORE_PORT}/${CORE_END_POINT}`;
    this.timeout = timeout || 2000;
    this.headers = { 'Content-Type': 'application/json', ...headers };
  }

  public getCoreClient(): AxiosInstance {
    const axiosClient = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: this.headers,
    });

    return axiosClient;
  }
}
