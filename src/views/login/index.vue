<template>
 <div class="login">
    <div class="login-container wrapper">
      <div class="login-container-form">
        <st-form  >
          <st-form-item label='邮箱地址'>
            <st-input :rules="emailRules" placeholder="请输入邮箱地址" type='text'></st-input>
          </st-form-item>
          <st-form-item label='密码'>
            <st-input placeholder="请输入密码" type='password'></st-input>
          </st-form-item>
        </st-form>
      </div>
    </div>
 </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, ref } from 'vue'
import StForm from '@/components/StForm.vue'
import StFormItem from '@/components/StFormItem.vue'
import StInput, { RuleProps } from '@/components/StInput.vue'

export default defineComponent({
  name: 'Login',
  props: {
  },
  components: {
    StForm,
    StFormItem,
    StInput
  },
  setup (props, ctx: SetupContext) {
    const data = reactive({
    })
    const text = ref('123')
    const emailRules:RuleProps = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    return {
      emailRules,
      ...toRefs(data),
      text
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
  }

}
</style>
