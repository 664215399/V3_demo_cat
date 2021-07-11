<template>
  <div class="AboutSkeleton">
    <div class="AboutSkeleton-name"></div>
    <div class="AboutSkeleton-description"></div>
    <div class="AboutSkeleton-description"></div>
    <div class="AboutSkeleton-description"></div>
    <div class="AboutSkeleton-description"></div>
    <div class="AboutSkeleton-origin">
      <img  src='' alt />
      <p></p>
    </div>
    <ul class="AboutSkeleton-temperament">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script lang="ts">
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

<style scoped lang="scss">
.AboutSkeleton {
  flex: 1;
  padding: 80px 20px 20px;
  box-sizing: border-box;
  margin-left: 20px;
  div {
    background: #f2f2f2;
  }
  &-name {
    height: 28px;
    margin-bottom: 10px;
  }
  &-description {
    height: 20px;
    margin-bottom: 10px;
  }

  &-temperament {
    display: flex;
    li {
      background-color: #f2f2f2;
      display: inline-block;
      height: 32px;
      width: 60px;
      margin-right: 10px;
    }
  }
  &-origin {
   height:35px;
   margin-bottom: 10px;
  }
}
</style>
