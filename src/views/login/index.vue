<template>
 <div class="login">
    <div class="login-container wrapper">
      <div class="login-container-form">
        <st-form :rules="emailRules"></st-form>
      </div>
    </div>
 </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from 'vue'
import StForm, { RuleProps } from '@/components/StForm.vue'
export default defineComponent({
  name: 'Login',
  props: {
  },
  components: {
    StForm
  },
  setup (props, ctx: SetupContext) {
    const data = reactive({
    })
    const emailRules:RuleProps = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    return {
      emailRules,
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang='scss'>
.login{
  width:100%;
  height:100%;
  background: url('../../assets/images/background.png') no-repeat center center/cover;
  &-container{
    height:100%;
    display: flex;
    &-form{
      margin: auto;
    }
    // padding-top:400px;
  }
}
</style>
