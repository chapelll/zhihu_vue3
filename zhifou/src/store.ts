import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, postProps } from './testData'

interface UserProps {
    isLogin?: boolean;
    name?: string;
    id?: number;
}

export interface GlobalDataProps {
    columns: ColumnProps[],
    posts: postProps,
    user: UserProps,
}

const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
        user: {
            isLogin: false,
        }
    },
    mutations: {
        login(state) {
            state.user = {
                ...state.user,
                isLogin: true,
                name: 'zcz'
            }
        }
    }
})

export default store
