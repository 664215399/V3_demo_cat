<template>
  <div class="ColumnList-wrapper">
    <div class="ColumnList wrapper" v-if="ColumnList?.length">
      <st-card v-for="(item, index) in ColumnList" :key="index">
        <template #image>
            <img :src="
              item.image?.url
                ? item.image.url
                : require('@/assets/images/nodata.png')
            " />
        </template>
        <template #title>
            {{ item.name }}
        </template>
        <template #copy>
            <textarea :id='"input"+index' class="st-card-copy"></textarea>
        </template>
        <template #description>
          <p class="st-card-description" title="Click on the copy" @click="clickCopy(index,item.description)">{{ item.description }}</p>
        </template>
        <template #goDetailes>
          <div class="st-card-goColumn" @click='enterColumn({id:item.id,name:item.name,url:item.image?.url?item.image.url:"noimage"})'>Enter the column</div>
        </template>
      </st-card>
    <div class="ColumnList-bottom"><st-button type="primary" @click="loadMore" v-if="showButton">Load more</st-button></div>
    </div>
    <column-skeleton v-else></column-skeleton>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch, ref, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { ColumnProps } from '@/utils/interface'
import { useRouter } from 'vue-router'
import ColumnSkeleton from '@/components/Skeleton/ColumnSkeleton.vue'
import StCard from '@/components/StCard.vue'
import StButton from '@/components/StButton.vue'

interface enterColumnPrpos {
  id: number;
  name?: string;
  url?: string;
}
type proxyProps=ComponentInternalInstance
export default defineComponent({
  name: 'ColumnList',

  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // 类型断言
      required: true
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },

  setup (props, context) {
    const router = useRouter()
    const ColumnList = computed(() => {
      return props.list
    })

    const enterColumn = (item: enterColumnPrpos) => {
      // store.commit('SAVE_AVATAR', item.url)
      localStorage.setItem('avatar', item.url ? item.url : 'noimage')
      router.push({ path: '/columndetailes', query: { id: item.id } })
    }
    const clickCopy = (index: number, description: string) => {
      const input: any = document.getElementById(`input${index}`)
      input.value = description // 修改文本框的内容
      input.select() // 选中文本
      document.execCommand('copy') // 执行浏览器复制命令
    }
    const page = ref<number>(1)
    const loadMore = () => {
      context.emit('more', page.value + 1)
      page.value++
    }
    return {
      clickCopy,
      ColumnList,
      enterColumn,
      StButton,
      loadMore
    }
  },
  components: {
    ColumnSkeleton,
    StCard,
    StButton
  }
})
</script>

<style scoped lang="scss">
.ColumnList {
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &::after {
    content: "";
    width: calc((100% - 40px) / 3);
  }
  &-bottom{
    width:100%;
    text-align: center;
  }

}
</style>
