<template>
  <div class="StForm-item_content">
    <input type="text" id="userEmail" :class="['StForm-input',inputRef.error?'StForm-input_error':'']" :value='inputRef.val' @input='updateValue' @blur="validateInput" v-bind='$attrs' />
    <div class="StForm-text" v-if="inputRef.error">{{inputRef.message}}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, PropType } from 'vue'
interface RuleProp {
  type: 'required' | 'email';
  message: string;
}
const reg =
  /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
export type RuleProps = RuleProp[];
export default defineComponent({
  name: '',
  props: {
    rules: Array as PropType<RuleProps>,
    modelValue: String
  },

  inheritAttrs: false, // 禁用attribute继承，配合$attr手动决定attribute赋值到某个元素
  components: {},
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    /** vue3双向数据绑定 */
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:updateValue', targetValue)
    }
    /** input失焦事件 */
    const validateInput = () => {
      if (!props.rules) return false// 如果props.rules为空返回
      const allPassed = props.rules.every((rule) => {
        // every遍历，只要有一项为false就会return false&&continue
        let passed = true
        inputRef.message = rule.message
        // 通过switch排查，利于后期添加更多的类型验证
        switch (rule.type) {
          case 'required':
            passed = inputRef.val.trim() !== ''
            break
          case 'email':
            passed = reg.test(inputRef.val)
            break
          default:
            break
        }
        return passed
      })

      inputRef.error = !allPassed// 取反
    }
    return {
      validateInput,
      updateValue,
      inputRef
    }
  }
})
</script>

<style scoped lang="scss">
.StForm-input{
  padding:0px 10px;
  border:2px solid transparent;
  box-sizing: border-box;
}
.StForm-input_error{
  border:2px solid #f56c6c;
}
.StForm-input::placeholder {
  color: #999999;
  font-size: 12px;

}
</style>
