import type { AxiosResponse } from 'axios'
import BaseApi from './BaseApi'

export default class ChatApi extends BaseApi {
  constructor() {
    super('/v1')
  }

  async createThread(): Promise<AxiosResponse<string>> {
    const response = await this.http.post<string>('/thread')
    return response
  }

  async sendMessage(message: string) {
    const response = await this.http.post('/chat', { message })
    return response.data
  }
}
