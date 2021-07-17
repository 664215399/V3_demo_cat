import { createApp } from 'vue'
import Message from '@/components/StMessage.vue'
export type MessageType = 'success' | 'warning' | 'default' | 'error'

const createMesage = (message: string, type: MessageType, duration = 2000, showClose = true) => {
  const messageInstance = createApp(Message, {
    message,
    type
    // showClose
  })

  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, duration)
}

export default createMesage
