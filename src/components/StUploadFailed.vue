<template>
  <div class="Failed">
    <h1 class="Failed-title">{{code}}</h1>
    <div id="Failed" class="Failed-container">
      <p>> <span>ERROR CODE</span>: "<i>HTTP {{code}} Forbidden</i>"</p>
      <p>> <span>ERROR DESCRIPTION</span>: "<i>{{errorDescription}}</i>"</p>
      <p>
        > <span>ERROR POSSIBLY CAUSED BY</span>: [<b>{{errorMore}}</b>...]
      </p>
      <p>> <span>HAVE A NICE DAY SIR {{nickName}} :-)</span></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  props: {
    code: {
      type: Number,
      default: 403
    },
    errorDescription: {
      type: String,
      default: 'Access denied. You do not have access permission'
    },
    errorMore: {
      type: String,
      default:
        'execute access forbidden, read access forbidden, write access forbidden, ssl required, ssl 128 required, ip address rejected, client certificate required, site access denied, too many users, invalid configuration, password change, mapper denied access, client certificate revoked, directory listing denied, client access licenses exceeded, client certificate is untrusted or invalid, client certificate has expired or is not yet valid, passport logon failed, source access denied, infinite depth is denied, too many requests from the same client ip'
    }
  },
  components: {},
  setup () {
    const store = useStore()
    const nickName = computed(() => store.state.userInfo.nickName)
    onMounted(() => {
      const node = document.getElementById('Failed')
      if (!node) return
      const str = node.innerHTML.toString()
      var i = 0
      node.innerHTML = ''
      setTimeout(function () {
        var se = setInterval(function () {
          i++
          node.innerHTML = str.slice(0, i) + '|'
          if (i === str.length) {
            clearInterval(se)
            node.innerHTML = str
          }
        }, 10)
      }, 0)
    })

    return {
      nickName
    }
  }
})
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono|Montserrat:700");

.Failed {
  &-title {
    font-size: 100px;
    text-align: center;
    position: absolute;
    user-select: none;
    width: calc(100% - 30px);
    z-index: 1;
    color: #ffffff26;
    text-shadow: 0 0 50px rgba(0, 0, 0, 0.07);
    top: 50%;
    transform: translateY(-50%);
    font-family: "Montserrat", monospace;
  }
  width: 100%;
  background-image: linear-gradient(120deg, #000000 0%, #000000 100%);
  height: 100%;
  position: relative;
  padding: 15px;
  box-sizing: border-box;
  &-container {
    background: rgba(0, 0, 0, 0);
    width: calc(100% - 30px);
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    box-sizing: border-box;
    box-shadow: 0 0 150px -20px rgba(0, 0, 0, 0.5);
    z-index: 3;
    height: calc(100% - 30px);
    overflow-y: auto;
    P {
      font-family: "Share Tech Mono", monospace;
      color: #f5f5f5;
      margin: 0 0 20px;
      font-size: 17px;
      line-height: 1.2;
    }

    span {
      color: #f0c674;
      font-size: 14px;
    }

    i,
    b {
      color: #37ff13;
      font-size: 14px;
    }

    div a {
      text-decoration: none;
    }
  }
}

@keyframes slide {
  from {
    right: -100px;
    transform: rotate(360deg);
    opacity: 0;
  }
  to {
    right: 15px;
    transform: rotate(0deg);
    opacity: 1;
  }
}
</style>
