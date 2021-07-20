<template>
  <div class="useredit">
    <bg-video></bg-video>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import BgVideo from './components/BgVideo.vue'
export default defineComponent({
  name: '',
  props: {},
  components: {
    BgVideo
  },
  setup (props, context) {
    const data = reactive({})
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang='scss'>
.useredit {
  margin: 0;
  width: 100%;
  height: calc(100% - 60px);
}

</style>
