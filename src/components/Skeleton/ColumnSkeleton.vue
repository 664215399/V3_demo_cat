<template>
  <ul class="ColumnListSkeleton wrapper ">
    <li v-for="(item, index) in 12" :key="index" class="ColumnListSkeleton-card ">
      <div class="ColumnListSkeleton-card-image">
        <img :src="require('@/assets/images/skeletonImage.svg')" />
      </div>
      <div class="flex-900">
        <h2 class="ColumnListSkeleton-card-title"></h2>
        <p class="ColumnListSkeleton-card-description"></p>
        <p class="ColumnListSkeleton-card-description"></p>
        <p class="ColumnListSkeleton-card-description"></p>
        <p class="ColumnListSkeleton-card-description"></p>
        <div class="ColumnListSkeleton-card-goColumn"></div>
      </div>
    </li>
  </ul>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup (props, context) {
    const data = reactive({})
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang='scss'>
.ColumnListSkeleton {
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
      margin: auto;
      width: 200px;
      img {
        margin-top: 65px;
      }
      height: 200px;
      border-radius: 50%;
      background: #f2f2f2;
    }
    &-title {
      height: 25px;
      margin: 10px 0px;
      background: #f2f2f2;
    }
    &-description {
      height: 16px;
      margin-bottom: 10px;
      background: #f2f2f2;
    }
    &-goColumn {
      background: #f2f2f2;
      display: inline-block;
      margin-top: 20px;
      width: 110px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #f2f2f2;
    }
  }
}
//过渡动画
.skeleton {
  background-color: #e2e5e7;
  background-image: linear-gradient(
    90deg,
    rgba(#fff, 0),
    rgba(#fff, 0.5),
    rgba(#fff, 0)
  );
  background-size: 40px 100%; // width of the shine
  background-repeat: no-repeat; // No need to repeat the shine effect
  background-position: left -40px top 0; // Place shine on the left side, with offset on the left based on the width of the shine - see background-size
  animation: shine 1s ease infinite; // increase animation time to see effect in 'slow-mo'
}

@keyframes shine {
  to {
    background-position: right -40px top 0;
  }
}
</style>
