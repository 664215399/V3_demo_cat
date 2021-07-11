<template>
  <div class="myColumn-wrapper">
    <div class="myColumn wrapper" v-if="myColumnsList?.length">
      <st-card v-for="(item, index) in myColumnsList" :key="index">
        <template #image>
          <img :src="
              item.image?.url
                ? item.image.url
                : require('@/assets/images/nodata.png')
            " />
        </template>
        <template #title>
          {{ item.title }}
        </template>
        <template #copy>
          <textarea :id='"input"+index' class="st-card-copy"></textarea>
        </template>
        <template #description>
          <p class="st-card-description" title="Click on the copy" @click="clickCopy(index,item.excerpt)">{{ item.excerpt }}</p>
        </template>
        <template #goDetailes>
          <div class="st-card-goColumn" @click='enterColumn({id:item.id,name:item.name,url:item.image?.url?item.image.url:"noimage"})'>Enter the column</div>
        </template>
      </st-card>

    </div>

    <column-skeleton v-else></column-skeleton>
  </div>
</template>

<script lang='ts'>
import { getMyColumns, myColumnsProps } from '@/api/login'
import { defineComponent, reactive, ref } from 'vue'
import ColumnSkeleton from '@/components/Skeleton/ColumnSkeleton.vue'
import StCard from '@/components/StCard.vue'
export default defineComponent({
  name: '',
  props: {},
  components: {
    ColumnSkeleton,
    StCard
  },
  setup () {
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
    console.log(myColumnsList)
    return {
      myColumnsList
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
