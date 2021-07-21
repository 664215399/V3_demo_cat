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
    <div class="myColumn-more">
       <st-button  @click="loadMore" v-if="showMoreFlag" >Load more</st-button>
    </div>
    </div>

    <column-skeleton v-else></column-skeleton>
  </div>
</template>

<script lang='ts'>
import { getMyColumns, myColumnsProps } from '@/api/login'
import { computed, defineComponent, reactive, ref } from 'vue'
import ColumnSkeleton from '@/components/Skeleton/ColumnSkeleton.vue'
import StButton from '@/components/StButton.vue'
import StCardTrans from '@/components/StCardTrans.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  props: {},
  components: {
    ColumnSkeleton,
    StButton,
    StCardTrans
  },
  setup () {
    const router = useRouter()
    const myColumnsList = ref()
    const store = useStore()
    const showMoreFlag = ref(true)
    const myColumnlist: myColumnsProps = reactive({
      pageSize: 6,
      currentPage: 1
    })
    const loadMore = () => {
      if (myColumnsList.value.length < store.state.count) {
        myColumnlist.currentPage++
        getPosts(myColumnlist)
      }
    }

    const getPosts = (myColumnlist:myColumnsProps) => {
      getMyColumns(localStorage.getItem('column') || '', myColumnlist).then(
        (res) => {
          if (myColumnlist.currentPage === 1) {
            myColumnsList.value = res.data.list
          } else {
            myColumnsList.value.push(...res.data.list)
          }
          store.commit('SAVE_COUNT', res.data.count)
          if (res.data.count === myColumnsList.value.length) {
            showMoreFlag.value = false
          }
        }
      )
    }
    getPosts(myColumnlist)
    const enterColumn = (id: string) => {
      router.push({ path: '/mycolumndetailes', query: { id: id } })
    }
    return {
      myColumnsList,
      enterColumn,
      loadMore,
      showMoreFlag
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
  &-more{
    width:100%;
    text-align: center;
  .StButton{
    background: rgb(255, 153, 20);
    color:#ffffff;
  }
  }
}
</style>
