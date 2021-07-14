<template>
  <div class="st-card">
    <div class="st-card-image">
        <slot name="image"></slot>
    </div>
    <div class="flex-900">
      <h2 class="st-card-title"><slot name="title"></slot></h2>
      <slot name="description"></slot>
      <slot name="copy"></slot>

      <div class="st-card-goDetailes"><slot name="goDetailes"></slot></div>
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
    return {

    }
  }
})
</script>

<style  lang='scss'>
 .st-card{
    width: calc((100% - 40px) / 3);
    padding: 20px;
    box-shadow: 0 0 16px 0 rgba(102, 102, 102, 0.12);
    text-align: center;
    position: relative;
    margin-bottom: 20px;
    &-copy {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
    &-image {
      overflow: hidden;
      margin: auto;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        // height: 200px;
      }
    }
    .toggle {
      transform-origin: center center;
      transform: rotateY(180deg);
      transition: 1s all;
    }
    &-title {
      line-height: 45px;
    }
    &-description {
      line-height: 26px;
      // min-height: 78px;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &-goDetailes {
      color: #666666;
      display: inline-block;
      margin-top: 20px;
      width: 110px;
      height: 32px;
      font-size: 12px;
      line-height: 32px;
      border-radius: 4px;
      border: 1px solid #4762fe;
      cursor: pointer;
      &:hover {
        background: #4762fe;
        color: #ffffff;
      }
    }
  }
  @media screen and (max-width: 1000px) {
   .st-card{
      width: calc((100% - 20px) / 2);
    }
  }
  @media screen and (max-width: 900px) {
    .st-card {
      width: 100%;
      display: flex;
      align-items: center;
      &-image {
        flex: 0.4;
        margin: 0;
        img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          // height: 200px;
        }
      }
      .flex-900 {
        flex: 0.6;
        text-align: center;
      }
    }
  }
</style>
