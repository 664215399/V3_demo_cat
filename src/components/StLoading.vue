<template>
    <div class="load" :style="{background:background||'',position:type==='globar'?'fixed':'absolute'}">
      <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import userDomCreate from '@/hook/userDomCreate'
type LoadingType = 'globar' | 'local';
export default defineComponent({
  name: '',
  props: {
    type: {
      type: String as PropType<LoadingType>,
      default: 'globar'
    },
    background: {
      type: String
    }
  },
  components: {},
  setup () {
    userDomCreate('message1')
    return {}
  }
})
</script>

<style lang="scss">
.load {
  // position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
#load {
  position: absolute;
  width: 600px;
  height: 36px;
  overflow: visible;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

#load div {
  position: absolute;
  width: 20px;
  height: 36px;
  opacity: 0;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 30px;
  animation: move 2s linear infinite;
  -o-animation: move 2s linear infinite;
  -moz-animation: move 2s linear infinite;
  -webkit-animation: move 2s linear infinite;
  transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  color: #35c4f0;
}

#load div:nth-child(2) {
  animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -webkit-animation-delay: 0.2s;
}
#load div:nth-child(3) {
  animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
}
#load div:nth-child(4) {
  animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  -webkit-animation-delay: 0.6s;
}
#load div:nth-child(5) {
  animation-delay: 0.8s;
  -o-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  -webkit-animation-delay: 0.8s;
}
#load div:nth-child(6) {
  animation-delay: 1s;
  -o-animation-delay: 1s;
  -moz-animation-delay: 1s;
  -webkit-animation-delay: 1s;
}
#load div:nth-child(7) {
  animation-delay: 1.2s;
  -o-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  -webkit-animation-delay: 1.2s;
}

@keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -moz-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-moz-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -moz-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-webkit-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-o-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}
</style>
