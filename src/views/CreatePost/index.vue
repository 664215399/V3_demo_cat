<template>
 <div class="create">
  <h2 class="create-title">New articles</h2>
  <div class="create-container">
    <st-form>
      <st-form-item label="Title:">
        <st-input placeholder="Please input title"/>
      </st-form-item>
      <st-form-item label="Content:">
        <st-input  placeholder="Please input contents of articles" tag='textarea' />
      </st-form-item>
      <template #submit>
        <st-button type="primary">Submit</st-button >
      </template>
    </st-form>
  </div>
 </div>
</template>

<script lang='ts'>
import StForm from '@/components/StForm.vue'
import StButton from '@/components/StButton.vue'
import StFormItem from '@/components/StFormItem.vue'
import StInput from '@/components/StInput.vue'
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: '',
  props: {
  },
  components: {
    StForm, StFormItem, StInput, StButton
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

<style scoped lang='scss'>
.create{
  height:calc(100% - 60px);
  // background: rgba(0,0,0,.3);
  &-title{
    color:#606266;
    text-align: center;
    padding-top: 40px;
  }
}
</style>
