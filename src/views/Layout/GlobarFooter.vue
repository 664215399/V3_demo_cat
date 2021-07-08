<template>
 <div class="GlobarFooter">

 </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {
  },
  components: {

  },
  setup (props, context) {
    const data = reactive({
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang='scss'>
.GlobarFooter{
  height:100px;
  background: #0068ff;
}
</style>
