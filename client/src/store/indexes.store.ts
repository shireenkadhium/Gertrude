import api from '@/services/api'
import { defineStore } from 'pinia'

export const useIndexesStore = defineStore('chats', {
  state: () => ({ chats: [] }),
  getters: {
    defaultChat: (state) => state.chats[0],
    noChats: (state) => state.chats.length === 0
  },
  actions: {
    async getIndexes() {
      try {
        this.chats = await api.getDocumentsIndexes()
      } catch (err) {
        console.log(err)
      }
    },
    async createIndex(formData: FormData) {
      const chat = await api.createDocumentsIndex(formData)
      this.chats.push(chat)
      return chat
    },
    async deleteIndex(id: string) {
      await api.removeDocumentsIndex(id)
      this.chats = this.chats.filter((chat) => chat.id !== id)
    }
  }
})
