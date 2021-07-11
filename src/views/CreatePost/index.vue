<template>
  <div class="create wrapper">
    <h2 class="create-title">New articles</h2>
    <div class="create-container">
      <st-upload :beforeUpload='beforeUpload' @file-uploaded='onFileUploaded' @file-uploaded-error="onFileUploadeError" action='http://apis.imooc.com/api/upload'>
        <template #loading>
          <st-loading type='local'></st-loading>
        </template>
        <template #success='successData'>
          <img :src="successData.successData.data.url" alt="">
        </template>
        <template #error='errorData'>
          <st-upload-failed :code='errorData.errorData.code' :errorDescription='errorData.errorData.error' > </st-upload-failed>
        </template>
      </st-upload>
      <st-form>
        <st-form-item label="Title:">
          <st-input placeholder="Please input title" />
        </st-form-item>
        <st-form-item label="Content:">
          <st-input placeholder="Please input contents of articles" tag='textarea' />
        </st-form-item>
        <template #submit>
          <st-button type="primary">Submit</st-button>
        </template>
      </st-form>
    </div>
  </div>
</template>

<script lang='ts'>
import StForm from '@/components/StForm.vue'
import StUpload from '@/components/StUpload.vue'
import StButton from '@/components/StButton.vue'
import StFormItem from '@/components/StFormItem.vue'
import StLoading from '@/components/StLoading.vue'
import StUploadFailed from '@/components/StUploadFailed.vue'
import StInput from '@/components/StInput.vue'
import createMessage from '@/hook/createMessage'
import { defineComponent, reactive } from 'vue'
import { ImageProps, createPostProps, ResponesType } from '@/api/login'

export default defineComponent({
  name: '',
  props: {},
  components: {
    StForm,
    StFormItem,
    StInput,
    StButton,
    StUpload,
    StLoading,
    StUploadFailed
  },
  setup () {
    const postData: createPostProps = reactive({
      title: '',
      content: '',
      image: '',
      column: '',
      author: ''
    })
    const beforeUpload = (file: File) => {
      const isformat = ['image/jpeg', 'image/png'].includes(file.type)
      if (!isformat) {
        createMessage('The format of the uploaded file is incorrect', 'error')
      }
      return isformat
    }

    const onFileUploaded = (data: ResponesType<ImageProps>) => {
      createMessage('Image uploaded successfully', 'success')
    }
    const onFileUploadeError = ({ error }: any) => {
      createMessage(error.response.data.error, 'error')
    }
    return {
      beforeUpload,
      postData,
      onFileUploaded,
      onFileUploadeError
    }
  }
})
</script>

<style scoped lang='scss'>
.create {
  height: calc(100% - 60px);
  // background: rgba(0,0,0,.3);
  min-width: 900px;
  &-title {
    color: #606266;
    text-align: center;
    padding-top: 40px;
    margin-bottom: 40px;
  }
  &-container {
    width: 80%;
    margin: auto;
  }
}
</style>
