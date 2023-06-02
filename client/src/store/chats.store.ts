import api from '@/services/api'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chats', {
  state: () => ({ chats: [] }),
  getters: {
    defaultChat: (state) => state.chats[0],
    noChats: (state) => state.chats.length === 0
  },
  actions: {
    async getChats() {
      try {
        this.chats = await api.getDocumentsIndexes()
        return this.chats
      } catch (err) {
        console.log(err)
        return this.chats
      }
    },
    async createChat(formData: FormData) {
      const chat = await api.createDocumentsIndex(formData)
      this.chats.push(chat)
      return chat
    },
    async deleteChat(id: string) {
      await api.removeDocumentsIndex(id)
      this.chats = this.chats.filter((chat) => chat.id !== id)
    }
  }
})
