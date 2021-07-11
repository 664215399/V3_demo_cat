<template>
  <div class="Register wrapper">
    <div class="Register_comtainer">
      <div class="Register_comtainer_top">
        <h1 class="welcome">Welcome To Register</h1>
        <p class="existing">Existing Account ?<span class="toLogin" @click="toLogin">Login</span></p>
      </div>
      <st-form @form-submit="onFormSubmit">
        <st-form-item label="Email">
          <st-input placeholder="Please input Email" :rules="emailRules" v-model="fromData.email" ></st-input>
        </st-form-item>
        <st-form-item label="Username">
          <st-input placeholder="Please input Username" :rules="nameRules" v-model="fromData.nickName"></st-input>
        </st-form-item>
        <st-form-item label="Password">
          <st-input placeholder="Please input Password" :rules="passRules" v-model='fromData.password' type='password' autocomplete="off"></st-input>
        </st-form-item>
        <st-form-item label="ConfirmPass">
          <st-input type='password' placeholder="Please input Password Again" :rules="confirmPassRules" v-model='fromData.ConfirmPassword' autocomplete="off"></st-input>
        </st-form-item>
      </st-form>
    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import StForm from '@/components/StForm.vue'
// import StButton from '@/components/StButton.vue'
import StFormItem from '@/components/StFormItem.vue'
import StInput, { RuleProps } from '@/components/StInput.vue'
import { createUser } from '@/api/login'
import createMessage from '@/hook/createMessage'
export default defineComponent({
  name: '',
  props: {},
  components: {
    StForm,
    StFormItem,
    StInput
  },
  setup () {
    const fromData = reactive({
      email: '',
      nickName: '',
      password: '',
      ConfirmPassword: ''
    })
    const emailRules: RuleProps = [
      { type: 'required', message: 'Email cannot be empty' },
      { type: 'email', message: 'Email format mismatching' }
    ]
    const passRules: RuleProps = [
      { type: 'required', message: 'Password cannot be empty' },
      {
        type: 'custom',
        validator: () => {
          return fromData.password.length > 6
        },
        message: 'The password must not be less than 6'
      }
    ]
    const confirmPassRules: RuleProps = [
      { type: 'required', message: 'ConfirmPassword cannot be empty' },
      {
        type: 'custom',
        validator: () => {
          return fromData.password === fromData.ConfirmPassword
        },
        message: "The two passwords don't match"
      }
    ]
    const nameRules: RuleProps = [
      { type: 'required', message: 'Username cannot be empty' }

    ]
    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // delete fromData.ConfirmPassword//有待优化
        const data = { email: fromData.email, nickName: fromData.nickName, password: fromData.password }
        createUser(data).then((res:any) => {
          createMessage(res.code === 0 ? 'Successful registration is now jumping to the login page' : res.data.error, 'success')
          if (res.code === 0) {
            setTimeout(() => router.push('/login'), 3000)
          }
        })
      }
    }
    const toLogin = () => {
      router.push('/login')
    }
    return {
      onFormSubmit,
      toLogin,
      emailRules,
      confirmPassRules,
      passRules,
      nameRules,
      fromData
    }
  }
})
</script>

<style scoped lang='scss'>
.Register {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/register.jpg") no-repeat center
    center/cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &_comtainer {
    height: 530px;
    min-width: 480px;
    margin-right:28%;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    &_top {
      padding: 50px 0px 0px 60px;
      .welcome {
        font-size: 36px;
        color: #000;
        padding-bottom: 4px;
      }
      .existing {
        font-size: 14px;
        color: #9b9b9b;
        .toLogin {
          color: #2e58ff;
          cursor: pointer;
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
  }

}
</style>
<style lang='scss'>
  .StForm {
    .StForm-item {
      justify-content: center;
    }
  }
</style>
