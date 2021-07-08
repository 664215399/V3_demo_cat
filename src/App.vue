<template>
  <!-- Skeleton And Loading 任选其一即可 -->

  <loadingView v-if="loadingFlag"/>
  <router-view />
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import loadingView from '@/components/StLoading.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'app',
  components: { loadingView },
  setup () {
    const store = useStore()
    const loadingFlag = computed(() => store.state.loadingFlag)
    return {
      loadingFlag

    }
  }
})
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  text-decoration: none;
}
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  width: 100%;
  // min-width: 1200px;
  height: 100%;
  overflow: auto;
}

.wrapper {
  width: 1200px;
  margin: auto;
  min-width: 750px;
}
.wraper {
  width: 1200px;
  margin: auto;
}
@media screen and (max-width: 1240px) {
  .wrapper {
    width: 80%;
    margin: auto;
  }
}
</style>
