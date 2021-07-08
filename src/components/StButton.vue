<template>
  <button class="StButton" :class="[type===''?'':'btReset']" :style="{background:buttonType[type],bordeColor:buttonType[type]}">
   <slot></slot>
 </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  setup () {
    const buttonType = {
      primary: '#0068ff',
      success: '#67c23a',
      danger: '#f56c6c'
    }
    return {
      buttonType
    }
  }
})
</script>

<style  lang='scss'>
.StButton{
  width:100px;
  height:40px;
  color:#606266;
  background: #ffffff;
  border-radius: 2px;
  font-size: 14px;
  border:none;
  border:1px solid #dcdfe6;
  outline: none;
  cursor: pointer;
  user-select: none;
  &.btReset{
    color:#ffffff;
    border:1px solid transparent;
  }
}
</style>
