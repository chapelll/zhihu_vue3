import Message from './message.vue'
import { createApp } from 'vue'

export type messageType = 'success' | 'error' | 'warning' | 'default'

//函数式组件
const createMessage = (message: string, type: messageType, timeout: 2000) => {
    //使用createApp创建组件,createApp第一个参数是组件实例，第二个参数是prop
    const messageInstance = createApp(Message, {
        message, type
    })
    //挂载组件实例(使用mount方法)
    const mountNode = document.createElement('div')
    messageInstance.mount(mountNode)
    //两秒后移除message组件
    setTimeout(() => {
        messageInstance.unmount()
        document.body.removeChild(mountNode)
    }, timeout)
}

export default createMessage
