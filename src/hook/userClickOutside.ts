import { ref, onMounted, onUnmounted, Ref } from 'vue'

const userClickOutside = (DropdownRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const TriggerClick = (e: MouseEvent) => {
    if (!DropdownRef.value) return false
    // if (DropdownRef.value.contains(e.target as HTMLElement)) {
    //   console.log('包含')
    // } else {
    //   console.log('不包含')
    // }
    isClickOutside.value = DropdownRef.value.contains(e.target as HTMLElement)
  }

  onMounted(() => {
    document.addEventListener('click', TriggerClick)
  })
  onUnmounted(() => {
    document.removeEventListener('click', TriggerClick)
  })
  return isClickOutside
}
export default userClickOutside
