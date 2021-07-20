<template>
  <div class="card">
    <div class="front">
      <slot name="image"></slot>
      <div class="upper"></div>
      <slot name='title'></slot>
      <slot name="description"></slot>
      <span>&lsaquo;&lsaquo; Hover For More Detailes &rsaquo;&rsaquo;</span>
    </div>
    <div class="back">
      <img src="http://easykey.uk/images/vgift/barry-avatar-400.png" alt="Avatar" />
      <slot name="who"></slot>
      <p>"Our Father which art in heaven, hallowed be thy name. Thy kingdom come, thy will be done in earth, as it is in heaven. Give us this day our daily bread. Forgive us our debts, as we also have forgiven our debtors. And lead us not into temptation, but deliver us from evil. For yours is the kingdom, the power and the glory forever. Amen!"</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup () {
    const data = reactive({})
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style  lang='scss'>
.card {
  width: calc((100% - 40px) / 3);
  padding: 20px;
  text-align: center;
  position: relative;
  margin-bottom: 20px;
  height: 415px;
  position: relative;
  transform-style: preserve-3d;
  transition: all 1s ease-in-out;
}
.card > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1f1f1f;
  color: #8e96a1;
  border: 4px solid #ff9914;
  border-radius: 20px;
  text-align: center;
  font-family: Arial, Tahoma;
}

/* Start of Front */
.card .front {
  z-index: 2;
  backface-visibility: hidden;
}
.card .front .upper {
  width: 100%;
  height: 20%;
  background-color: #ff9914;
  border-radius: 10px 10px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
.card .front img {
  width: 125px;
  height: 125px;
  border: 4px solid #ff9914;
  border-radius: 50%;
  margin-top: 20px;
  position: relative;
  z-index: 4;
}
.card .front h2 {
  color: #fff;
  padding: 10px;
  margin-bottom: 0;
}
.card .front p {
  padding: 20px 20px;
  line-height: 26px;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}

.card .front span {
  color: #ff9914;
  font-weight: bold;
}
.card:hover {
  transform: rotateY(180deg);
}
/* End of Front */

/* Start of Back */
.card .back {
  z-index: 1;
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
.card .back img {
  width: 80px;
  height: 80px;
  border: 4px solid #ff9914;
  border-radius: 50%;
  margin-top: 20px;
  position: absolute;
  top: 10px;
  left: 20px;
  display: inline-block;
}
.card .back h2 {
  user-select: none;
  cursor: pointer;
  color: #fff;
  padding: 10px;
  margin-bottom: 0;
  margin-top: 50px;
  margin-left: 74px;
  display: inline-block;
  &:hover{
    text-decoration:underline;
  }
}
.card .back p {
  padding: 20px;
  margin-top: 20px;
  line-height: 26px;
}
/* End of Back */
</style>
