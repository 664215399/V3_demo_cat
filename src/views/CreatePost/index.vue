<template>
  <div class="create wrapper">
    <h2 class="create-title">{{isEdit?'Edit articles':'New articles'}}</h2>
    <div class="create-container">
      <st-upload :beforeUpload='beforeUpload' @file-uploaded='onFileUploaded' :upLoadedData='upLoadedData' class="handClass" @file-uploaded-error="onFileUploadeError" action='http://apis.imooc.com/api/upload'>
        <template #loading>
          <st-loading type='local'></st-loading>
        </template>
        <template #success='successData'>
          <img :src="successData.successData.data.url" alt="">
        </template>
        <template #error='errorData'>
          <st-upload-failed :code='errorData.errorData.code' :errorDescription='errorData.errorData.error'> </st-upload-failed>
        </template>
      </st-upload>
      <st-form @form-submit="onFormSubmit">
        <st-form-item label="Title:">
          <st-input placeholder="Please input title" :rules="titleProps" v-model="titleVal" />
        </st-form-item>
        <st-form-item label="Content:">
          <st-input placeholder="Please input contents of articles" tag='textarea' :rules="contentProps" v-model="contentVal"/>
        </st-form-item>
        <!-- <template #submit>
          <st-button type="primary">Submit</st-button>
        </template> -->
      </st-form>
    </div>
  </div>
</template>

<script lang='ts'>
import StForm from '@/components/StForm.vue'
import StUpload from '@/components/StUpload.vue'
import StFormItem from '@/components/StFormItem.vue'
import StLoading from '@/components/StLoading.vue'
import StUploadFailed from '@/components/StUploadFailed.vue'
import StInput, { RuleProps } from '@/components/StInput.vue'
import createMessage from '@/hook/createMessage'
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { ImageProps, createPostProps, ResponesType, createPost, getMyColumnsDetailes } from '@/api/login'
import { beforeUploadCheck } from '@/utils/index'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: '',
  props: {},
  components: {
    StForm,
    StFormItem,
    StInput,
    // StButton,
    StUpload,
    StLoading,
    StUploadFailed
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const apiType = ref()
    const isEdit = !!route.query.id
    const titleVal = ref('')
    const contentVal = ref('')
    const upLoadedData = ref()
    const postData: createPostProps = reactive({
      title: titleVal.value,
      content: contentVal.value,
      image: '',
      column: '',
      author: ''
    })
    onMounted(() => {
      if (isEdit) {
        getMyColumnsDetailes(route.query.id + '').then(_res => {
          const curretData = _res.data

          if (curretData.image) {
            upLoadedData.value = { data: curretData.image }
            postData.image = curretData.image._id
          }
          titleVal.value = _res.data.title
          contentVal.value = _res.data.content
        })
      }
    })

    const titleProps: RuleProps = [
      { type: 'required', message: 'Title cannot be empty' }
    ]
    const contentProps: RuleProps = [
      { type: 'required', message: 'Content cannot be empty' }
    ]
    const onFileUploaded = (data: ResponesType<ImageProps>) => {
      if (data.data._id) {
        postData.image = data.data._id
      }
      createMessage('Image uploaded successfully', 'success')
    }
    const onFileUploadeError = ({ error }: any) => {
      createMessage(error.response.data.error, 'error')
    }
    const beforeUpload = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'] })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('The file format is incorrect', 'error')
      }
      if (error === 'size') {
        createMessage('The file size cannot exceed 1MB', 'error')
      }
      return passed
    }
    const onFormSubmit = (result: boolean) => {
      if (!result) return false
      if (!postData.image) {
        createMessage('Please upload image', 'error')
        return false
      }
      const { _id, column } = store.state.userInfo
      postData.column = column
      postData.author = _id
      if (isEdit) {
        postData.title = titleVal.value
        postData.content = contentVal.value
      }

      createPost(postData, apiType.value = isEdit, route.query.id + '').then((res:any) => {
        if (res.code === 0) {
          createMessage(isEdit ? 'Modified the article successfully' : 'Create article successfully', 'success')
          setTimeout(() => {
            router.push('/MyColum')
          }, 2000)
        }
      })
    }

    return {
      beforeUpload,
      postData,
      isEdit,
      contentVal,
      titleVal,
      onFileUploaded,
      onFileUploadeError,
      contentProps,
      titleProps,
      onFormSubmit,
      upLoadedData
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

    .handClass {
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
<style lang='scss'>
.create {
  .StForm-submit-button {
    background: #0068ff;
  }
}
</style>
