<template>
  <div class="GlobarHeader" :style="{background:$route.meta.headerBg?$route.meta.headerBg:'#0068ff'}">
    <div class="GlobarHeader-container wrapper">
      <h2 class="GlobarHeader-container-title" @click="goHome">CAT FAMILY</h2>
      <ul v-if="userInfo?.nickName" class="GlobarHeader-container-isLogin">
        <li>
          <st-dropdown :title='`Hello ${userInfo.nickName}`' @commandEmit='commandEmit' index='1'>
            <st-dropdown-item command="1" :disabled="route.path==='/create'">NewArtic</st-dropdown-item>
            <st-dropdown-item command="2" :disabled="route.path==='/mycolum'">MyColumns</st-dropdown-item>
            <st-dropdown-item command="3" :disabled="route.path==='/useredit'">UserEdit</st-dropdown-item>
            <st-dropdown-item command="4">Logout</st-dropdown-item>
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
import { defineComponent, ref, reactive } from 'vue'
import StDropdown from '@/components/StDropdown.vue'
import StDropdownItem from '@/components/StDropdownItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { getUserInfo } from '@/api/login'
import { useStore } from 'vuex'
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
    const store = useStore()
    const goHome = () => {
      router.push('/')
    }
    const commandEmit = (val: string) => {
      const arr: string[] = ['/create', '/mycolum', '/useredit', '/login']
      if (val === '4') {
        localStorage.removeItem('token')
      }
      router.push(arr[+val - 1])
    }
    const doSomething = (i:number) => {
      const path = !i ? '/login' : '/register'
      router.push(path)
    }
    const userInfo = ref()
    if (localStorage.getItem('token')) {
      getUserInfo().then(res => {
        userInfo.value = res.data
        store.commit('SVAVE_USER_INFO', res.data)
      }).catch((error) => {
        console.log(error)
      // router.push('/login')
      })
    }

    return {
      route,
      userInfo,
      commandEmit,
      doSomething,
      goHome

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
      cursor: pointer;
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

      >li{
        margin-left: 20px;
      }
    }
  }
}
</style>
