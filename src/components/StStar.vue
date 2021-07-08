<template>
  <div class="Start">
    <div class="Start_label">{{$attrs.label}}：</div>
    <ul class="Start_container">
      <li class="Start_container_item" v-for="(item,index) in 5" :key="index">
        <img
          :src="starLeave>index?require('@/assets/images/starfull32.svg'):require('@/assets/images/star32.svg')"
        />
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: '',
  props: {
    leave: {
      type: Number,
      required: true,
      default: 0
    }
  },
  components: {},
  setup (props) {
    const starLeave = computed(() => {
      return props.leave
    })
    return {
      starLeave
    }
  }
})
</script>

<style scoped lang='scss'>
.Start {
  height: 80px;
  display: flex;
  align-items: center;
  &_label {
    width: 200px;
    text-align: right;
    margin-right: 20px;
    font-size: 24px;
    color: #565656;
    line-height: 32px;
  }
  &_container {
    display: flex;
    align-items: center;
    li {
      margin: 0px 5px;
      img {
        display: block;
      }
    }
  }
}
</style>
