
<template>
  <form class="StForm">
    <slot name="default"></slot>
    <div class="StForm-submit" >
        <slot name="submit">
          <button type="submit" class="StForm-submit-button" @click.prevent="submitForm">Submit</button>
        </slot>
    </div>
  </form>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, PropType, onUnmounted } from 'vue'
import mitt from 'mitt'// 事件监听器
export const mitter = mitt()
type validateFunc=()=>boolean
export default defineComponent({
  name: '',
  props: {

  },
  components: {},
  setup (props, context) {
    const funArr:validateFunc[] = []
    const submitForm = () => {
      const result = funArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback = (func:any) => {
      funArr.push(func)
    }
    mitter.on('from-item-created', callback)
    onUnmounted(() => {
      mitter.off('from-item-created', callback)// 销毁
      // funArr=[]
    })
    return {
      submitForm

    }
  }
})
</script>

<style lang='scss'>
.StForm {
  background: rgba(255, 255, 255, 0.1);
  // background: #ffffff;
  // height:100%;
  width: 100%;
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
      color: #606266;
    }
  }
  &-submit{
    text-align: center;
    &-button{
      cursor: pointer;
      user-select: none;
      background: #e2231a;
      color:#ffffff;
      border:none;
      outline: none;
      width:100px;
      height:40px;
    }
  }
}
</style>
