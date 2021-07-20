<template>
 <div>
  <video poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/polina.jpg" id="bgvid" playsinline muted  autoplay loop>
      <source src="http://thenewcode.com/assets/videos/polina.mp4" type="video/mp4">
      <source src="http://thenewcode.com/assets/videos/polina.webm" type="video/webm">
    </video>
 </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {
  },
  components: {

  },
  setup (props, context) {
    const data = reactive({
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style  lang='scss'>
video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  transform: translateX(-50%) translateY(-50%);
  background: url("../../../assets/images/polina.jpeg") no-repeat center center/cover;
  transition: 1s opacity;
}
.stopfade {
  opacity: 0.5;
}
</style>
