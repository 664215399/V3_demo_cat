<template>
  <div class="StForm-item">
    <label :for="label" class="StForm-item-label">{{label}}</label>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from 'vue'
export default defineComponent({
  name: '',
  props: {
    label: {
      type: String,
      reqrired: true
    }
  },
  components: {},
  setup (props, context) {
    const data = reactive({})
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang='scss'>
</style>
