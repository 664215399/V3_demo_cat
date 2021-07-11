<template>
 <div>

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

</style>
