import type ChatCommand from '@/command/ChatCommand'
import type Message from '@/resource/Message'
import type { AxiosResponse } from 'axios'
import BaseApi from './BaseApi'
import type ChatThreadResponse from '@/types/ChatThreadResponse'

export default class ChatApi extends BaseApi {
  constructor() {
    super('/v1')
  }

  async createThread(): Promise<AxiosResponse<ChatThreadResponse>> {
    const response = await this.http.post<ChatThreadResponse>('/thread')
    return response
  }

  async getAllThreads(): Promise<AxiosResponse<string[]>> {
    const response = await this.http.get<string[]>('/thread/ids')
    return response
  }

  async getMessages(threadId: string): Promise<AxiosResponse<Message[]>> {
    const response = await this.http.get<Message[]>(`/thread/${threadId}/messages`)
    return response
  }

  async sendMessage(message: ChatCommand): Promise<AxiosResponse<Message>> {
    const response = await this.http.post<Message>('/chat', message)
    return response
  }

  async deleteThread(threadId: string): Promise<AxiosResponse<void>> {
    const response = await this.http.delete<void>(`/thread/${threadId}`)
    return response
  }
}
