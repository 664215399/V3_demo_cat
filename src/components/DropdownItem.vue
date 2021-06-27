<template>
  <li class="Dropdowm-item" :class="{'is-disabled':disabled}">
    <slot></slot>
  </li>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from 'vue'
export default defineComponent({
  name: '',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }

  },
  components: {},
  setup (props, ctx: SetupContext) {
    const data = reactive({})
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang='scss'>
.Dropdowm-item.is-disabled{
  color: #c0c4cc;
  pointer-events: none;
  background: transparent;
}
.Dropdowm-item {
  padding: 0px 10px;
  user-select: none;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  &:hover {
    background: rgba(0, 104, 255, 0.2);
    color: #ffffff;
  }
  &:not(:nth-last-of-type(1)) {
    margin-bottom: 5px;
  }
}
</style>
