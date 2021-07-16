<template>
  <div class="StForm-item_content">
    <input v-if="tag!=='textarea'" :class="['StForm-input',inputRef.error?'StForm-input_error':'']" v-model='inputRef.val' @blur="validateInput" v-bind='$attrs' />
    <textarea v-else :class="['StForm-textarea',inputRef.error?'StForm-input_error':'']" v-model='inputRef.val'  @blur="validateInput" v-bind='$attrs'></textarea>
    <div class="StForm-text" v-if="inputRef.error">{{inputRef.message}}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, PropType, onMounted, computed } from 'vue'
import { mitter } from './StForm.vue'
interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type tagType = 'input' | 'textarea';
export type RuleProps = RuleProp[];

const reg =
  /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/

export default defineComponent({
  name: '',
  props: {
    rules: Array as PropType<RuleProps>,
    modelValue: String,
    tag: {
      type: String as PropType<tagType>,
      default: 'input'
    }
  },
  inheritAttrs: false, // 禁用attribute继承，配合$attr手动决定attribute赋值到某个元素
  components: {},
  setup (props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })

    onMounted(() => {
      mitter.emit('from-item-created', validateInput)
    })
    /** vue3双向数据绑定 */
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    /** input失焦事件 */
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          // every遍历，只要有一项为false就会return false&&continue
          let passed = true
          inputRef.message = rule.message
          // 通过switch排查，利于后期拓展更多的类型验证
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = reg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed // 取反
        return allPassed
      }
      return true
    }
    return {
      validateInput,

      inputRef
    }
  }
})
</script>

<style scoped lang="scss">
.StForm-input,
.StForm-textarea {
  width: 100%;
  padding: 0px 10px;
  outline: none;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
}
.StForm-textarea {
  height: 100px;
  line-height: 20px;
}
.StForm-input_error {
  border: 2px solid #f56c6c;
}
.StForm-input::placeholder {
  color: #999999;
  font-size: 12px;
}
.StForm-textarea::placeholder {
  color: #999999;
}
</style>
