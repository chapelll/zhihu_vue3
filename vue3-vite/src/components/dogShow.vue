<template>
  <img :src="result && result.message">
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'
export default defineComponent({

  async setup() {
    let rawData = await axios.get('https://dog.ceo/api/breeds/image/random')
    return {
      result: rawData.data
    }
  }
})
</script>

<style scoped></style>
