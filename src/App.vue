<template>
    <router-view />
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app',
  components: { },
  setup () {
    return {

    }
  }
})
</script>
<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    text-decoration: none;
  }
  html,
  body {
    height: 100%;
    width: 100%;
  }
  #app{
    width: 100%;
    // min-width: 1200px;
    height: 100%;
  }
  .wrapper{
    width:1200px;
    margin: auto;
  }
  @media screen and (max-width: 1240px) {
   .wrapper{
    width:80%;
    margin: auto;
  }
}
</style>
