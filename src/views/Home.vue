<template>
  <div class="home">
      <!-- <st-message type="success" message='asdasdas'></st-message> -->

         <column-list :list='list' @more='more' :showButton='showButton'></column-list>

      <!-- <st-confirm></st-confirm> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { ColumnProps } from '@/utils/interface'
import { getColumnList } from '@/api/index'
import { useStore } from 'vuex'
import createMessage from '@/hook/createMessage'
import StConfirm from '@/components/StConfirm.vue'
export default defineComponent({
  name: 'app',
  components: { ColumnList },
  setup () {
    const dataList = ref<Array<ColumnProps>>([])
    const store = useStore()
    const isLoadFlag = computed(() => store.state.isLoad)
    const showButton = ref(true)
    const getList = (page:number) => {
      getColumnList(page).then(res => {
        if (res.data.length < 21) {
          showButton.value = false
        }
        // setTimeout(() => {
        if (!isLoadFlag.value) {
          dataList.value = res.data
          store.commit('SET_ISLOAD', true)
        } else {
          dataList.value.push(...res.data)
        }

      // createMessage('请求成功', 'success')
      // }, 30000000)
      })
    }
    getList(1)
    const more = (page:number) => {
      getList(page)
    }
    return {
      list: dataList,
      more,
      showButton

    }
  }
})
</script>
<style lang="scss"></style>
