import { createStore } from 'vuex'
import { columnTest, postTest, ColumnProps, postProps } from './testData'

interface UserProps {
    isLogin?: boolean;
    name?: string;
    id?: number;
    columnId?: number
}

export interface GlobalDataProps {
    columns: ColumnProps[],
    posts: postProps[],
    user: UserProps,
}

const store = createStore<GlobalDataProps>({
    state: {
        columns: columnTest,
        posts: postTest,
        user: {
            isLogin: true,
            name: 'zcz',
            id: 1,
            columnId: 100,
        }
    },
    getters: {
        biggerColumnLen(state) {
            return state.columns.filter((item) => item.id > 1).length
        },
        getColumnById: (state) => (id: number) => {
            state.columns.find((item) => item.id === id)
        },
        getPostsByCid: (state) => (id: number) => {
            state.posts.filter((item) => item.columnId === id)[0].list
        },
    },
    mutations: {
        login(state) {
            state.user = {
                ...state.user,
                isLogin: true,
                name: 'zcz'
            }
        },
        createPost(state, data) {
            const index = state.posts.findIndex((item) => {
                return item.columnId = data.columnId
            })
            state.posts[index].list.push(data.post)
        }

    },


})

export default store
