<template>
  <div class="layout">
    <globar-header></globar-header>
    <!-- <div class="layout_container"> -->
    <router-view></router-view>
    <!-- </div> -->
    <!-- <globar-footer></globar-footer> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GlobarHeader from './GlobarHeader.vue'
import GlobarFooter from './GlobarFooter.vue'

export default defineComponent({
  name: 'app',

  components: { GlobarHeader },
  setup () {
    return {

    }
  }
})
</script>
<style lang="scss">
.layout{
  height:100%;
  // &_container{
  //    height: calc(100% - 160px);
  //     overflow:auto;
  // }
}
</style>
