<template>
  <div class="myColumn-wrapper">

    <div class="myColumn wrapper" v-if="myColumnsList?.length">
       <st-card-trans v-for="(item, index) in myColumnsList" :key="index">
      <template #image>
        <img :src="
              item.image?.url
                ? item.image.url
                : require('@/assets/images/nodata.png')
            " />
      </template>
      <template #title>
        <h2>{{ item.title }}</h2>
      </template>
      <template #description>
        <p>{{ item.excerpt }}</p>
      </template>
      <template #who>
        <h2 @click='enterColumn(item._id)'>Who Am I ?!</h2>
      </template>

    </st-card-trans>
    </div>

    <column-skeleton v-else></column-skeleton>
  </div>
</template>

<script lang='ts'>
import { getMyColumns, myColumnsProps } from '@/api/login'
import { defineComponent, reactive, ref } from 'vue'
import ColumnSkeleton from '@/components/Skeleton/ColumnSkeleton.vue'

import StCardTrans from '@/components/StCardTrans.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '',
  props: {},
  components: {
    ColumnSkeleton,

    StCardTrans
  },
  setup () {
    const router = useRouter()
    const myColumnsList = ref()
    const myColumnlist: myColumnsProps = reactive({
      pageSize: 5,
      currentPage: 1
    })
    getMyColumns(localStorage.getItem('column') || '', myColumnlist).then(
      (res) => {
        myColumnsList.value = res.data.list
      }
    )
    const enterColumn = (id: string) => {
      // store.commit('SAVE_AVATAR', item.url)
      // localStorage.setItem('avatar', item.url ? item.url : 'noimage')
      router.push({ path: '/MyColumnDetailes', query: { id: id } })
    }
    console.log(myColumnsList)
    return {
      myColumnsList,
      enterColumn
    }
  }
})
</script>

<style scoped lang='scss'>
.myColumn {
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &::after {
    content: "";
    width: calc((100% - 40px) / 3);
  }
}
</style>
