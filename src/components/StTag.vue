<template>
  <div
    class="tag"
    :style="{color:colorEnmus[type].color,background:colorEnmus[type].background,borderColor:colorEnmus[type].border}"
  >
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: '',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  components: {},
  setup () {
    const colorEnmus = reactive({
      default: { color: '#409eff', background: '#ecf5ff', border: '#d9ecff' },
      success: { color: '#67c23a', background: '#f0f9eb', border: '#e1f3d8' },
      info: { color: '#909399', background: '#f4f4f5', border: '#e9e9eb' },
      warning: { color: '#e6a23c', background: '#fdf6ec', border: '#faecd8' },
      danger: { color: '#f56c6c', background: '#fef0f0', border: '#fde2e2' }
    })
    return {
      colorEnmus
    }
  }
})
</script>

<style scoped lang='scss'>
.tag {
  background: #ecf5ff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  margin:10px 10px 10px 0px;
}
</style>
