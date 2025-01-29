import apiClient from './apiClient'

export const getMessages = async () => {
  const response = await apiClient.get('/messages')
  return response.data
}

export const sendMessage = async (chatId: string) => {
  const response = await apiClient.post(`/chats/${chatId}/messages`, {})
  return response.data
}
