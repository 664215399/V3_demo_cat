import { render, createVNode } from 'vue'
import Confirm from '@/components/StConfirm.vue'
export interface AfterClose {
  cancel: boolean;
  confirm: boolean;
}
export interface ConfirmProps {
  title?: string; // 标题
  content?: string; // 内容
  confirmText?: string; // 确定按钮文字
  cancelText?: string; // 取消按钮文字
  confirm?: () => void; // 确定按钮回调
  cancel?: () => void; // 取消按钮回调
  afterClose?: (params: AfterClose) => void; // 动画完成回调
}

let container: null | HTMLElement
let options: any

const _render = (props: ConfirmProps) => {
  if (container) {
    document.body.removeChild(container)
  }
  container = document.createElement('div')
  options = {
    ...props

  }
  const vm = createVNode(Confirm, options)
  render(vm, container)
  document.body.appendChild(container)
}
// 普通提示
const show = (props: ConfirmProps) => {
  _render({
    ...props
  })
}

export default {
  show
}
