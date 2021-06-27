<template>
  <div class="GlobarHeader">
    <div class="GlobarHeader-container wrapper">
      <h2 class="GlobarHeader-container-title">宠物之家</h2>
      <ul v-if="!userInfo.isLogin" class="GlobarHeader-container-noLogin">
        <li>登陆</li>
        <li>注册</li>
      </ul>
      <ul v-else class="GlobarHeader-container-isLogin">
        <li>
          <dropdown :title='`Hello ${userInfo.name}`' :list="list" >
            <dropdown-item >新建文章</dropdown-item>
            <dropdown-item disabled>用户编辑</dropdown-item>
            <dropdown-item>退出登入</dropdown-item>
          </dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext, PropType } from 'vue'
import dropdown, { DdListProps } from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
const DropList: DdListProps[] = [
  {
    label: 1,
    value: '修改密码'
  },
  {
    label: 1,
    value: '退出登陆'
  }
]
export default defineComponent({
  name: 'GlobarHeader',
  props: {
    userInfo: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components: {
    dropdown,
    DropdownItem
  },
  setup (props, ctx: SetupContext) {
    const data = reactive({})
    return {
      ...toRefs(data),
      list: DropList
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
        width: 58px;
        height: 38px;
        border: 1px solid #f8f9fa;
        display: inline-block;
        border-radius: 4px;
        margin-left: 10px;
        text-align: center;
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
