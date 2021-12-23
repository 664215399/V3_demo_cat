<template>
  <div class="login wrapper">
    <div class="login-container ">
      <div class="login-container-top">
        <h1 class="welcome">Welcome To Login</h1>
        <p class="noaccount">There Is No Account ?<span class="toRegister" @click="toRegister">Register</span></p>
      </div>
      <div class="login-container-form">
        <st-form @form-submit="onFormSubmit">
          <st-form-item label="Email">
            <st-input :rules="emailRules" placeholder="Please input your Email" type="text" v-model="emailValue"></st-input>
          </st-form-item>
          <st-form-item label="Passwoed">
            <st-input :rules="passRules" placeholder="Please input your password" type="password" autocomplete="off" v-model="passValue"></st-input>
          </st-form-item>
          <!-- <template v-slot:submit>
            <div>
               <button type="submit" class="StForm-submit-button">Submit</button>
            </div>
          </template> -->
        </st-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import StForm from '@/components/StForm.vue'
// import StButton from '@/components/StButton.vue'
import StFormItem from '@/components/StFormItem.vue'
import StInput, { RuleProps } from '@/components/StInput.vue'
export default defineComponent({
  name: 'Login',
  props: {},
  components: {
    StForm,
    StFormItem,
    StInput
    // StButton
  },
  setup () {
    const data = reactive({})
    const store = useStore()
    const router = useRouter()
    const emailValue = ref('664215399@qq.com')
    const passValue = ref('1234567')
    const emailRules: RuleProps = [
      { type: 'required', message: 'Email cannot be empty' },
      { type: 'email', message: 'Email format mismatching' }
    ]
    const passRules: RuleProps = [
      { type: 'required', message: 'Password cannot be empty' }
    ]
    const toRegister = () => {
      router.push('/register')
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailValue.value,
          password: passValue.value
        }
        store.dispatch('userLogin', payload).then((res) => {
          if (res.token) router.push('/')
        })
      }
    }

    return {
      emailRules,
      passRules,
      ...toRefs(data),
      onFormSubmit,
      emailValue,
      passValue,
      toRegister
    }
  }
})
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/background.png") no-repeat center
    center/cover;
  &-container {
    width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    align-items: center;
    &-top {
      width: 100%;
      background: rgba(255, 255, 255, 0.1);
      padding: 50px 0px 0px 60px;
      .welcome {
        font-size: 36px;
        color: #000;
        padding-bottom: 4px;
        color: #ffffff;
      }
      .noaccount {
        font-size: 14px;
        color: #ffffff;
        .toRegister {
          color: #2e58ff;
          cursor: pointer;
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    &-form {
      height: 300px;
      width: 500px;
    }
  }
}
</style>
<style lang="scss">
.login {
  .StForm-item-label {
    color: #ffffff;
  }
}
</style>
