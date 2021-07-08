<template>
  <teleport to='#message'>
    <div class="message-wrapper" :style="{background:meType[type]?.background,borderColor:meType[type]?.borderColor,color:meType[type]?.color}">
      <div class="message-wrapper-icon"><img :src='require(`@/assets/images/${type}.svg`)' ></div>
      <p class="message-wrapper-text">{{message}}</p>
      <div class="message-wrapper-close" v-if="showClose"><img src="@/assets/images/x.svg" ></div>
    </div>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent, reactive, PropType } from 'vue'
import userDomCreate from '@/hook/userDomCreate'
export type MessageType = 'success' | 'warning' | 'default' | 'error';
export default defineComponent({
  name: '',
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    },
    message: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup () {
    const meType = reactive({
      success: {
        color: '#67C23A',
        borderColor: '#e1f3d8',
        background: '#f0f9eb'
      },
      warning: {
        color: '#E6A23C',
        borderColor: '#faecd8',
        background: '#fdf6ec'
      },
      default: {
        color: '#909399',
        borderColor: '#EBEEF5',
        background: '#edf2fc'
      },
      error: {
        color: '#F56C6C',
        borderColor: '#fde2e2',
        background: '#fef0f0'
      }

    })
    userDomCreate('message')
    return {
      meType
    }
  }
})
</script>

<style  lang='scss'>
.message-wrapper {
  img{
      display: block;
      width:16px;
      height:16px;
    }
  min-width: 380px;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: fixed;
  left: 50%;
  top: 20px;
  // height:20px;
  transform: translateX(-50%);
  // background-color: #edf2fc;
  // transition: opacity 0.3s, top 0.4s, -webkit-transform 0.4s;
  // transition: opacity 0.3s, transform 0.4s, top 0.4s;
  // transition: opacity 0.3s, transform 0.4s, top 0.4s, -webkit-transform 0.4s;
  padding: 15px 15px 15px 20px;
  &-icon{
    margin-right: 10px;
  }
  &-text{
    font-size: 16px;
    line-height: 1;
  }
  &-close{
     margin-left: auto;

  }

}
</style>
