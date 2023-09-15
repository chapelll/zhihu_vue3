import { createStore } from 'vuex'

const store = createStore({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            state.count++
        }
    }
})

console.log(store.state.count);
store.commit('add')
console.log(store.state.count);

export default store
