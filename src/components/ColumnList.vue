<template>
  <div class="ColumnList-wrapper">
    <ul class="ColumnList wrapper">
      <li v-for="(item, index) in ColumnList" :key="item.id" class="ColumnList-card">
        <div class="ColumnList-card-image" @mouseleave.prevent="toggleAvatar({ index, i: 0 })" @mouseenter="toggleAvatar({ index, i: 1 })">
          <img :src="
              !ToggleFlag || index !== 1
                ? item.avatar
                : require('@/assets/images/guo.png')
            " :class="[ToggleFlag && index === 1 ? 'toggle' : '']" />
        </div>
        <div class="flex-900">
          <h2 class="ColumnList-card-title">{{ item.title }}</h2>
          <p class="ColumnList-card-description">{{ item.description }}</p>
          <a href="#" class="ColumnList-card-goColumn">进入专栏</a>
        </div>

      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  PropType,
  computed
} from 'vue'
export interface ColumnProps {
  id: number;
  title: string;
  description: string;
  avatar?: string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // 类型断言
      required: true
    }
  },
  setup (props, ctx: SetupContext) {
    const data = reactive({
      ToggleFlag: false
    })
    const ColumnList = computed(() => {
      return props.list.map((item) => {
        item.avatar = item.avatar
          ? item.avatar
          : require('@/assets/images/nodata.png')
        return item
      })
    })
    const toggleAvatar = function (item: any) {
      if (item.index !== 1) return
      // console.log(item.i)
      // console.log(data.ToggleFlag)
      data.ToggleFlag = !!item.i
    }
    return {
      ...toRefs(data),
      ColumnList,
      toggleAvatar
    }
  },
  components: {}
})
</script>

<style scoped lang="scss">
.ColumnList {
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &-card {
    width: calc((100% - 40px) / 3);
    padding: 20px;
    box-shadow: 0 0 16px 0 rgba(102, 102, 102, 0.12);
    text-align: center;
    margin-bottom: 20px;
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
    }
    &-goColumn {
      color: #666666;
      display: inline-block;
      margin-top: 20px;
      width: 110px;
      height: 32px;
      font-size: 14px;
      line-height: 32px;
      border-radius: 4px;
      border: 1px solid #4762fe;
      cursor: pointer;
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
