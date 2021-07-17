<template>
<teleport to='#Confirm'>
  <div class="StConfirm" @click.stop="handleStopPropagation">
    <div class="StConfirm-container">
      <div class="StConfirm-box">
        <div class="StConfirm-box-header">
          <p>{{title}}</p>
          <img src="@/assets/images/close.svg" alt="" v-if="showClose"/>
        </div>
        <div class="StConfirm-box-body">
          {{content}}
        </div>
        <div class="StConfirm-box-footer">
          <st-button @click="handleClick(0)">{{cancelText}}</st-button>
          <st-button type="primary" @click="handleClick(1)">{{confirmText}}</st-button>
        </div>
      </div>
    </div>
  </div>
  </teleport>
</template>

<script lang="ts">

import { defineComponent, PropType, ref, watch } from 'vue'
import StButton from '@/components/StButton.vue'
import userDomCreate from '@/hook/userDomCreate'
interface AfterClose {
  cancel: boolean;
  confirm: boolean;
}
export interface Confirm {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  confirm: () => void;
  cancel: () => void;
  destroy: () => void;
  showClose?:boolean
  afterClose: (params: AfterClose) => void;
}

export default defineComponent({
  name: 'Confirm',
  components: { StButton },
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    title: {
      type: String as PropType<string>,
      default: 'Prompt'
    },
    content: {
      type: String as PropType<string>,
      default: 'This action will permanently delete the file. Do you want to continue?'
    },
    confirmText: {
      type: String as PropType<string>,
      default: 'Confirm'
    },
    cancelText: {
      type: String as PropType<string>,
      default: 'Cancel'
    },
    showClose: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    confirm: {
      type: Function as PropType<() => void>,
      default () {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {}
      }
    },
    cancel: {
      type: Function as PropType<() => void>,
      default () {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {}
      }
    },
    destroy: {
      type: Function as PropType<() => void>,
      default () {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {}
      }
    },
    afterClose: {
      type: Function as PropType<() => void>,
      default () {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {}
      }
    }
  },
  setup (props: Readonly<Confirm>) {
    userDomCreate('Confirm')
    const removeChild = () => {
      const node = document.getElementById('Confirm')
      if (node) {
        document.body.removeChild(node)
      }
    }

    const handleClick = (index: number) => {
      if (index === 0) {
        removeChild()
        props.cancel()
      } else {
        removeChild()
        props.confirm()
      }
    }
    const handleStopPropagation = (e: MouseEvent) => {
      e.stopPropagation()
    }
    return {

      handleClick,
      handleStopPropagation
    }
  }
})
</script>

<style scoped lang="scss">
.StConfirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2022;
  &-container {
    z-index: 2023;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    .StConfirm-box {
      margin: auto;
      width: 420px;
      padding-bottom: 10px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      font-size: 18px;
      &-header {
        padding: 15px 15px 10px;
        display: flex;
        justify-content: space-between;
        img {
          cursor: pointer;
          width: 16px;
          height: 16px;
        }
      }
      &-body {
        padding: 10px 15px;
        color: #606266;
        font-size: 14px;
      }
      &-footer {
        padding: 10px 15px;
        display: flex;
        justify-content: flex-end;
        .StButton {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
