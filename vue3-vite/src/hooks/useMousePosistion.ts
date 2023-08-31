import { ref } from "vue"

// 鼠标追踪

const useMousePosistion = () => {
    let x = ref(0)
    let y = ref(0)
    document.addEventListener("click", (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    })

    return { x, y }
}

export default useMousePosistion
