import { createStore } from 'vuex'
import axios from 'axios'

interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
    columnId?: number;
}
interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}
export interface PostProps {
    _id: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps;
    createdAt: string;
    column: string;
}
export interface GlobalDataProps {
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
}
const store = createStore<GlobalDataProps>({
    state: {
        columns: [],
        posts: [],
        user: { isLogin: true, name: 'viking', columnId: 1 }
    },
    mutations: {
        login(state) {
            state.user = { ...state.user, isLogin: true, name: 'viking' }
        },
        createPost(state, newPost) {
            state.posts.push(newPost)
        },
        fetchColumns(state, rawData) {
            state.columns = rawData.data.list
        },
        fetchColumn(state, rawData) {
            state.columns = [rawData.data]
        },
        fetchPosts(state, rawData) {
            state.posts = rawData.data.list
        },
    },
    getters: {
        getColumnById: (state) => (id: string) => {
            return state.columns.find(c => c._id === id)
        },
        getPostsByCid: (state) => (cid: string) => {
            return state.posts.filter(post => post.column === cid)
        },
    },
    actions: {
        async fetchColumns(context) {
            const resp = await axios.get('/columns')
            context.commit('fetchColumns', resp.data)
        },
        async fetchColumn(context, id) {
            const resp = await axios.get(`/columns/${id}`)
            context.commit('fetchColumn', resp.data)
        },
        async fetchPosts(context, id) {
            const resp = await axios.get(`/columns/${id}/posts`)
            context.commit('fetchPosts', resp.data)
        },
    },
})

export default store