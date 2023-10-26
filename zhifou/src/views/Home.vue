<template>
    <div class="home-page">
        <section class="py-5" text-center container>
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto text-center">
                    <img src="../assets/index.svg" alt="callout" class="w-50">
                    <h2 class="font-weight-light">书写你的想法!</h2>
                    <p>
                        <a href="#" class="btn btn-primary my-2" @click="handle">开始写文章</a>
                    </p>
                </div>
            </div>
        </section>
        <h4 class="font-weight-bold text-center">发现精彩</h4>
        <ColumnList :list="list"></ColumnList>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import createMessage from '../components/createMessage'
import { useStore } from 'vuex'


export default defineComponent({
    name: 'home',
    components: {
        ColumnList
    },
    setup() {
        const store = useStore()

        onMounted(() => {
            store.dispatch('fetchColumns')
        })

        const list = computed(() => {
            console.log(store.state.columns);
            return store.state.columns
        })

        const handle = () => {
            createMessage('ok', 'success',2000)
        }

        return {
            list, handle
        }
    }
})
</script>
  
<style scoped></style>
  