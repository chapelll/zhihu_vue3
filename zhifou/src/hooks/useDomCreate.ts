import { onUnmounted } from 'vue'

const useDomCreate = (nodeId: string) => {
    const node = document.createElement('div')
    node.id = nodeId
    document.body.appendChild(node)

    onUnmounted(() => {
        document.body.removeChild(node)
    })
}

export default useDomCreate
