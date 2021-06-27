<template>
 <form class="StForm">
   <div class="StForm-item">
     <label for="userEmail" class="StForm-item-label">邮箱地址</label>
     <input type="text" id="userEmail" class="StForm-item-input" v-model="inputRef.val" @blur="validateInput">
     <div class="StForm-item-text" v-if="inputRef.error">{{inputRef.message}}</div>
   </div>
    <!-- <div class="StForm-item">
     <label for="userEmail">密码</label>
     <input type="text" id="userEmail" class="StForm-item-input">
     <div class="StForm-item-text"></div>
   </div> -->
 </form>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, PropType } from 'vue'
interface RuleProp{
  type:'required'|'email'
  message:string
}
const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
export type RuleProps=RuleProp[]
export default defineComponent({
  name: '',
  props: {
    rules: Array as PropType<RuleProps>
  },
  components: {

  },
  setup (props, ctx: SetupContext) {
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (!props.rules) return false
      const allPassed = props.rules.every(rule => {
        let passed = true
        inputRef.message = rule.message
        switch (rule.type) {
          case 'required':
            passed = (inputRef.val.trim() !== '')
            break
          case 'email':
            passed = reg.test(inputRef.val)
            break
          default :
            break
        }
        return passed
      })
      inputRef.error = !allPassed
    }
    return {
      validateInput,
      inputRef
    }
  }
})
</script>

<style scoped lang='scss'>
.StForm{
  background:rgba(255,255,255,.1);
  height:200px;
  padding:0px 20px;
  &-item{
    height: 40px;
      &-input{
        width:460px;
        height: 28px;
        line-height: 28px;
        color:#999999;
      }
      &-label{
        font-size: 14px;
        width:80px;
         color:#ffffff;
      }
      &-text{
        color:#f56c6c;
        font-size: 12px;
        line-height: 20px;
      }
  }
}
</style>
