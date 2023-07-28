import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

export default class BaseApi {
  protected http = axios.create({
    headers: {
      'Content-type': 'application/json'
    },
    withCredentials: true
  })

  constructor(baseURL: string) {
    this.http.defaults.baseURL = baseURL
  }

  protected get<T>(path: string): Promise<AxiosResponse<T>> {
    return this.http.get<T>(path)
  }

  protected post<T, U>(path: string, data: U): Promise<AxiosResponse<T>> {
    return this.http.post<T>(path, data)
  }

  protected put<T, U>(
    path: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.http.put<T>(path, data, config)
  }

  protected delete<T>(path: string): Promise<AxiosResponse<T>> {
    return this.http.delete<T>(path)
  }
}
