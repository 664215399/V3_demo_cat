<template>
  <div class="ColumnList-wrapper">
    <ul class="ColumnList wrapper" v-if="ColumnList?.length">
      <li v-for="(item, index) in ColumnList" :key="index" class="ColumnList-card">
        <div class="ColumnList-card-image">
          <img :src="
              item.image?.url
                ? item.image.url
                : require('@/assets/images/nodata.png')
            " />
        </div>
        <div class="flex-900">
          <h2 class="ColumnList-card-title">{{ item.name }}</h2>
          <p class="ColumnList-card-description" title="Click on the copy" @click="clickCopy(index,item.description)">{{ item.description }}</p>
          <textarea :id='"input"+index' class="ColumnList-card-copy"></textarea>
          <div class="ColumnList-card-goColumn" @click='enterColumn({id:item.id,name:item.name,url:item.image?.url?item.image.url:"noimage"})'>Enter the column</div>
        </div>
      </li>
    </ul>
    <column-skeleton v-else></column-skeleton>

  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, PropType, computed } from 'vue'
import { ColumnProps } from '@/utils/interface'
import { useRouter } from 'vue-router'
import ColumnSkeleton from '@/components/Skeleton/ColumnSkeleton.vue'
import { useStore } from 'vuex'
interface enterColumnPrpos {
  id: number;
  name?: string;
  url?: string;
}
export default defineComponent({
  name: 'ColumnList',

  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // 类型断言
      required: true
    }
  },

  setup (props) {
    const router = useRouter()
    const store = useStore()
    const ColumnList = computed(() => {
      return props.list
    })
    const enterColumn = (item: enterColumnPrpos) => {
      // store.commit('SAVE_AVATAR', item.url)
      localStorage.setItem('avatar', item.url ? item.url : 'noimage')
      router.push({ path: '/ColumnDetailes', query: { id: item.id } })
    }
    const clickCopy = (index: number, description: string) => {
      const input: any = document.getElementById(`input${index}`)
      input.value = description // 修改文本框的内容
      input.select() // 选中文本
      document.execCommand('copy') // 执行浏览器复制命令
    }
    return {
      clickCopy,
      ColumnList,
      enterColumn
    }
  },
  components: {
    ColumnSkeleton
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
  &-card {
    width: calc((100% - 40px) / 3);
    padding: 20px;
    box-shadow: 0 0 16px 0 rgba(102, 102, 102, 0.12);
    text-align: center;
    position: relative;
    margin-bottom: 20px;
    &-copy {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
    &-image {
      overflow: hidden;
      margin: auto;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        // height: 200px;
      }
    }
    .toggle {
      transform-origin: center center;
      transform: rotateY(180deg);
      transition: 1s all;
    }

    &-title {
      line-height: 45px;
    }
    &-description {
      line-height: 26px;
      // max-height: 100px;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &-goColumn {
      color: #666666;
      display: inline-block;
      margin-top: 20px;
      width: 110px;
      height: 32px;
      font-size: 12px;
      line-height: 32px;
      border-radius: 4px;
      border: 1px solid #4762fe;
      cursor: pointer;
      &:hover {
        background: #4762fe;
        color: #ffffff;
      }
    }
  }
  @media screen and (max-width: 1000px) {
    &-card {
      width: calc((100% - 20px) / 2);
    }
  }
  @media screen and (max-width: 900px) {
    &-card {
      width: 100%;
      display: flex;
      align-items: center;
      &-image {
        flex: 0.4;
        margin: 0;
        img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          // height: 200px;
        }
      }
      .flex-900 {
        flex: 0.6;
        text-align: center;
      }
    }
  }
}
</style>
