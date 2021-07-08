import { onUnmounted } from 'vue'

const userDomCreate = (domId:string) => {
  const node = document.createElement('div')// 动态创建html标签
  node.id = domId// 设置id
  document.body.appendChild(node)// setup在beforeCreate和created之间，dom元素还没有挂载，此时将创建的loading节点挂载到body上
  onUnmounted(() => {
    document.body.removeChild(node)// 组件卸载是将loading节点删除
  })
}
export default userDomCreate
