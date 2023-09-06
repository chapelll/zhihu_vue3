import { Ref, ref, onMounted, onUnmounted } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
    const isOutside = ref(false)
    const handle = (e: MouseEvent) => {
        if (elementRef.value) {
            if (elementRef.value.contains(e.target as HTMLElement)) {
                isOutside.value = false
            } else {
                isOutside.value = true
            }
        }
    }
    onMounted(()=>{
        document.addEventListener("click",handle)
    })
    onUnmounted(()=>{
        document.removeEventListener("click",handle)
    })
    return isOutside
}

export default useClickOutside
