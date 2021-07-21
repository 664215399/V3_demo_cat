<template>
  <div class="useredit">
    <bg-video></bg-video>
    <div class="useredit-container wrapper">
      <div class="useredit-container-avatar">
        <st-upload action='http://apis.imooc.com/api/upload' :beforeUpload='beforeUpload' @file-uploaded='onFileUploaded' :upLoadedData='upLoadedData' class="handClass" @file-uploaded-error="onFileUploadeError" >
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
      </div>
      <div class="useredit-container-info">
        <st-form @form-submit="onFormSubmit">
          <st-form-item label="NICKNAME：">
            <st-input placeholder="Please input nickName" :rules="nameProps" v-model="nameVal"></st-input>
          </st-form-item>
          <st-form-item label="DESCRIPTION：">
             <st-input placeholder="Please input description" tag="textarea" :rules="desProps" v-model="desVal"></st-input>
          </st-form-item>
        </st-form>
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { toRefs, defineComponent, reactive, onMounted, ref, computed } from 'vue'
import BgVideo from './components/BgVideo.vue'
import StForm from '@/components/StForm.vue'
import StUpload from '@/components/StUpload.vue'
import StFormItem from '@/components/StFormItem.vue'
import StInput, { RuleProps } from '@/components/StInput.vue'
import StLoading from '@/components/StLoading.vue'
import { beforeUploadCheck } from '@/utils/index'
import StUploadFailed from '@/components/StUploadFailed.vue'
import createMessage from '@/hook/createMessage'

import { ImageProps, editUserProps, ResponesType, editUser, getUserInfo } from '@/api/login'

import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: '',
  props: {},
  components: {
    BgVideo,
    StForm,
    StUpload,
    StFormItem,
    StInput,
    StUploadFailed,
    StLoading
  },
  setup (props, context) {
    const store = useStore()
    const router = useRouter()
    const nameVal = ref('')
    const desVal = ref('')
    const upLoadedData = ref()

    const postData: editUserProps = reactive({
      avatar: '',
      description: '',
      nickName: '',
      _id: ''
    })

    // postData.column = userInfo.column

    onMounted(() => {
      getUserInfo().then((res:any) => {
        console.log(res.data)
        if (res.data) {
          nameVal.value = res.data.nickName
          desVal.value = res.data.description
          upLoadedData.value = { data: { url: res.data.avatar?.url } }
        }
      })
    })
    // console.log(userInfo)

    const nameProps: RuleProps = [
      { type: 'required', message: 'Nickname cannot be empty' }
    ]
    const desProps: RuleProps = [
      { type: 'required', message: 'Description cannot be empty' }
    ]
    const onFileUploaded = (data: ResponesType<ImageProps>) => {
      if (data.data._id) {
        postData.avatar = data.data._id
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
      if (!postData.avatar) {
        createMessage('Please upload image', 'error')
        return false
      }
      postData.nickName = nameVal.value
      postData.description = desVal.value
      const { _id } = store.state.userInfo
      postData._id = _id
      editUser(postData).then((res:any) => {
        if (res.code === 0) {
          createMessage('User information modified successfully', 'success')
        }
      })
    }
    return {
      onFileUploaded,
      onFileUploadeError,
      onFormSubmit,
      beforeUpload,
      desProps,
      nameProps,
      nameVal,
      desVal,
      upLoadedData

    }
  }
})
</script>

<style scoped lang='scss'>
.useredit {
  margin: 0;
  width: 100%;
  height: calc(100% - 60px);
  padding-top: 100px;
  &-container {
    &-avatar {
      margin-bottom: 20px;
    }
  }

    .handClass {
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
}
</style>
<style lang='scss'>
.useredit {
  .Upload,
  .StForm,
  .StForm-input,
  .StForm-textarea,
  .StForm-item-label,
  .StForm-submit-button {
    color:#ffffff;
    background: none;
    &::placeholder{
      color:#ffffff;
    }
  }
  .StForm,
  .StForm-submit-button {
    border: 1px solid #dcdfe6;
  }
  .StForm-item-label{
    width:100px
  }
}
</style>
