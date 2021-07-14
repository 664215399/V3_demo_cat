<template>
  <div class="Dropdown" ref='DropdownRef' @mouseenter='domHover(1)' @mouseleave='domHover(0)'>
    <div class="Dropdown-title" @click='openToggle' >{{title}}</div>
    <ul class="Dropdown-list"  v-show="isOpen" >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  watch
} from 'vue'
import userClickOutside from '@/hook/userClickOutside'
import mitter from '@/utils/mitt'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    },

    trigger: {
      type: String,
      default: 'hover'
    }
  },
  components: {},
  setup (props, context) {
    const types = 1
    const DropdownRef = ref<null | HTMLElement>(null)
    const data = reactive({})
    const isOpen = ref(false)
    const domHover = (val: number) => {
      if (props.trigger !== 'hover') return false
      isOpen.value = val !== 0
    }
    const openToggle = () => {
      isOpen.value = !isOpen.value
    }
    const domLeave = () => {
      if (props.trigger !== 'hover') return false
      isOpen.value = false
    }
    const showflag = userClickOutside(DropdownRef)
    watch(showflag, () => {
      if (props.trigger !== 'click') return false
      isOpen.value = (isOpen.value && showflag.value)
    })
    mitter.off('handlerCommand')
    mitter.on('handlerCommand', (val:any) => {
      context.emit('commandEmit', val)
      isOpen.value = false
    })

    return {
      ...toRefs(data),
      isOpen,
      // commandEmit,
      DropdownRef,
      openToggle,
      domHover,
      domLeave,
      types

    }
  }
})
</script>

<style scoped lang='scss'>
.Dropdown {
  position: relative;
  &-list {
    min-width: 100px;
    border-radius: 3px;
    padding: 10px 0px;
    background: #ffffff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 16px 0 rgba(102, 102, 102, 0.12);
    color: #333333;
    z-index: 9999;
  }
}
</style>
