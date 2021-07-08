<template>
  <div class="login">
    <div class="login-container wrapper">
      <div class="login-container-form">
        <st-form @form-submit="onFormSubmit">
          <st-form-item label="Email">
            <st-input
              :rules="emailRules"
              placeholder="Please input your Email"
              type="text"
              v-model="emailValue"
            ></st-input>
          </st-form-item>
          <st-form-item label="Passwoed">
            <st-input
              :rules="passRules"
              placeholder="Please input your password"
              type="password"
              autocomplete="off"
              v-model="passValue"
            ></st-input>
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
    const emailValue = ref()
    const passValue = ref()
    const emailRules: RuleProps = [
      { type: 'required', message: 'Email cannot be empty' },
      { type: 'email', message: 'Email format mismatching' }
    ]
    const passRules: RuleProps = [
      { type: 'required', message: 'Password cannot be empty' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailValue.value,
          password: passValue.value
        }
        store.dispatch('userLogin', payload).then(res => {
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
      passValue
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
    height: 100%;
    display: flex;
    &-form {
      margin: auto;
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
