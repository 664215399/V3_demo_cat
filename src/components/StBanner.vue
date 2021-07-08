<template>
  <div class="banner-wrapper" id="banner-wrapper" @mouseleave="timerToggle(0)" @mouseenter="timerToggle(1)">
    <ul class="banner-container" :style="{marginLeft:-currentIndex*500+'px'}" v-if="bannerList.length">
      <li v-for="(item,index) in bannerList" :key="index" class="banner-silde">
        <img :src="item.iamge?item.iamge:require('@/assets/images/skeletonImage.svg')" />
      </li>
    </ul>
    <ul class="banner-container" v-else>
      <li class="banner-silde">
        <img src="@/assets/images/skeletonImage.svg" class="skeletonImage" />
      </li>
    </ul>
    <ul class="Pagination">
      <li v-for="(item,index) in bannerList" :key="index" class="Pagination-item" :class="currentIndex===index?'active':''" @click="indexToggle(index)"></li>
    </ul>
    <ul class="nextAndPrev">
      <li class="nextAndPrev_prev" @click="bannerToggle(0)">
        <img src="@/assets/images/next.svg" alt class="prev" />
      </li>
      <li class="nextAndPrev_next" @click="bannerToggle(1)">
        <img src="@/assets/images/next.svg" alt />
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: '',
  props: {
    bannerList: {
      type: Array,
      required: true
    }
  },
  components: {},
  setup (props, context) {
    const imageList = computed(() => {
      return props.bannerList
    })
    const currentIndex = ref(0)
    const Timer = ref()
    const setTimer = () => {
      Timer.value = setInterval(() => {
        if (currentIndex.value === props.bannerList.length - 1) {
          currentIndex.value = 0
        } else {
          currentIndex.value++
        }
      }, 2000)
    }
    const clearTimer = () => {
      window.clearInterval(Timer.value)
    }
    setTimer()
    const bannerToggle = (i: number) => {
      if (i && currentIndex.value < props.bannerList.length - 1) {
        currentIndex.value++
      } else if (!i && i !== currentIndex.value) {
        currentIndex.value--
      }
    }
    const timerToggle = (i: number) => {
      i ? clearTimer() : setTimer()
    }
    const indexToggle = (i: number) => {
      currentIndex.value = i
    }
    return {
      imageList,
      Timer,
      currentIndex,
      bannerToggle,
      timerToggle,
      indexToggle
    }
  }
})
</script>

<style  lang='scss'>
.banner-wrapper {
  position: relative;
  width: 500px;
  height: 400px;
  overflow: hidden;
  .Pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    li {
      user-select: none;
      cursor: pointer;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: 0px 10px;
      background: rgba(0, 0, 0, 0.5);
      &.active {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .nextAndPrev {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 30px;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    li {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      user-select: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
      .prev {
        transform: rotate(180deg);
        transform-origin: center center;
      }
    }
  }
  .banner-container {
    width: 900%;
    float: left;
    height: 100%;
    .banner-silde {
      float: left;
      width: 500px;
      height: 100%;
      display: flex;
      .skeletonImage {
        width: 200px;
        height: 200px;
        margin:auto;
        display: block;
      }
      img {
        width: 500px;
        height: 400px;
      }
    }
  }
  .currentIndex {
    position: fixed;
    top: 500px;
  }
}
</style>
