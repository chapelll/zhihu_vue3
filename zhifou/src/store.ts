import { createStore, Commit } from 'vuex'
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
    loading: boolean;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    const { data } = await axios.get(url)
    commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
    state: {
        loading: false,
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
        setLoading(state, status) {
            state.loading = status
        }
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
        async fetchColumns({ commit }) {
            getAndCommit('/columns', 'fetchColumns', commit)
        },
        async fetchColumn({ commit }, id) {
            getAndCommit(`/columns/${id}`, 'fetchColumn', commit)
        },
        async fetchPosts({ commit }, id) {
            getAndCommit(`/columns/${id}/posts`, 'fetchPosts', commit)
        },
    },
})

export default store