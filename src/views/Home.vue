<template>
  <div class="home">
      <!-- <st-message type="success" message='asdasdas'></st-message> -->
      <column-list :list='list'></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { ColumnProps } from '@/utils/interface'
import { getColumnList } from '@/api/index'
import createMessage from '@/hook/createMessage'
export default defineComponent({
  name: 'app',
  components: { ColumnList },
  setup () {
    const dataList = ref<Array<ColumnProps>>([])
    getColumnList().then(res => {
      // setTimeout(() => {
      dataList.value = res.data
      // createMessage('请求成功', 'success')
      // }, 30000000)
    })
    return {
      list: dataList
    }
  }
})
</script>
<style lang="scss"></style>
