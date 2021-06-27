
<template>
  <form class="StForm">
    <slot></slot>
  </form>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, PropType } from 'vue'

export default defineComponent({
  name: '',
  props: {

  },
  components: {},
  setup (props, context) {
    return {

    }
  }
})
</script>

<style lang='scss'>
.StForm {
  background: rgba(255, 255, 255, 0.1);
  // background: #ffffff;
  height: 300px;
  width: 500px;
  padding: 40px 20px;
  &-item {
    width: 100%;
    min-height: 40px;
    display: flex;
    line-height:40px;
    margin-bottom: 30px;
    &_content {
      position: relative;
      width: calc(100% - 170px);
      .StForm-input {
        width: 100%;
        height: 28px;
        line-height: 28px;
        color: #999999;
      }
      .StForm-text {
        position: absolute;
        color: #f56c6c;
        font-size: 12px;
        line-height: 30px;

      }
    }
    &-label {
      font-size: 14px;
      text-align: right;
      margin-right: 20px;
      width: 80px;
      color: #ffffff;
    }
  }
}
</style>
