import Message from './message.vue'
import { createApp, h, render } from 'vue'

export type messageType = 'success' | 'error' | 'warning' | 'default'

//函数式组件
const createMessage = (message: string, type: messageType, timeout?: number) => {
    //使用createApp创建组件,createApp第一个参数是组件实例，第二个参数是prop
    const messageVnode = h(Message, {
        message, type
    })
    //挂载组件实例(使用mount方法)
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    render(messageVnode, mountNode)
    //两秒后移除message组件
    const destory = () => {
        render(null, mountNode)
        document.body.removeChild(mountNode)
    }
    if (timeout) {
        setTimeout(() => {
            destory()
        }, timeout)
    }

    return {
        //返回这个方法，实例调用上就会出现它
        destory
    }

}

export default createMessage
