import { ref } from 'vue'
import axios from 'axios'

function useURLLoader<T>(url: string) {
    //T是泛型，表示的是result可能的类型
    let result = ref<T | null>(null)
    let loading = ref(true)
    let loaded = ref(false)
    let error = ref(null)

    axios.get(url).then((res) => {
        result.value = res.data
        loading.value = false
        loaded.value = true
    }).catch((err) => {
        error.value = err
    })

    return {
        result, loading, loaded, error
    }
}

export default useURLLoader
