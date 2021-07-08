<template>
  <div class="GlobarHeader">
    <div class="GlobarHeader-container wrapper">
      <h2 class="GlobarHeader-container-title">PET FAMILY</h2>
        <ul v-if="userInfo?.nickName" class="GlobarHeader-container-isLogin">
        <li>
          <st-dropdown :title='`Hello ${userInfo.nickName}`' @commandEmit='commandEmit'>
            <st-dropdown-item command="1" :disabled="route.path==='/create'">NewArtic</st-dropdown-item>
            <st-dropdown-item command="2">UserEdit</st-dropdown-item>
            <st-dropdown-item command="3">Logout</st-dropdown-item>
          </st-dropdown>
        </li>
      </ul>
      <ul v-else class="GlobarHeader-container-noLogin">
        <li @click="doSomething(0)">Login</li>
        <li @click="doSomething(1)">Register</li>
      </ul>

    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import StDropdown from '@/components/StDropdown.vue'
import StDropdownItem from '@/components/StDropdownItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { getUserInfo } from '@/api/login'
export interface UserProps {
  avatar?: {
    url: string;
    _id: string;
  };
  column: string;
  description: string;
  email: string;
  nickName: string;
  _id: string;
}
export default defineComponent({
  name: 'GlobarHeader',
  props: {

  },
  components: {
    StDropdown,
    StDropdownItem
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const commandEmit = (val: string) => {
      const arr: string[] = ['/create', '/', '/Login']
      if (val === '3') {
        localStorage.removeItem('token')
      }
      router.push(arr[+val - 1])
    }
    const doSomething = (i:number) => {
      const path = !i ? '/login' : ''
      router.push(path)
    }
    const userInfo = ref()
    getUserInfo().then(res => {
      userInfo.value = res.data
    }).catch(() => {
      router.push('/login')
    })
    return {
      route,
      userInfo,
      commandEmit,
      doSomething
    }
  }
})
</script>

<style scoped lang='scss'>
.GlobarHeader {
  background: #0068ff;
  width: 100%;
  &-container {
    padding: 0px 20px;
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    color: #f8f9fa;

    li {
      cursor: pointer;
    }
    &-title {
      font-size: 24px;
    }
    &-noLogin {
      li {
        user-select: none;
        min-width: 58px;
        height: 38px;
        border: 1px solid #f8f9fa;
        display: inline-block;
        border-radius: 4px;
        margin-left: 10px;
        text-align: center;
        padding:0px 10px;
        font-size: 14px;
        line-height: 38px;
        &:hover {
          background: #f8f9fa;
          color: #333333;
        }
      }
    }
    &-isLogin {
    }
  }
}
</style>
