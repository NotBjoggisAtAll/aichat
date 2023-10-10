export default interface ChatThreadResponse {
  chatThreadId: number
  messages: string[]
  accountId: number | null
}
