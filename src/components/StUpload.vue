<template>
  <div class="Upload" v-bind="$attrs">
    <input type="file" name="file" ref="fileInput" style="display:none" @change='handFileChage'>
    <div class="Upload-container" @click.prevent="triggerUpload">
      <slot name="defalut" v-if="fileStauts==='ready'">
        <img src="@/assets/images/upload.svg">
        <p class="clickUpload">Click on Upload</p>
        <p class="instructions">Extensions: JPG Or PNG</p>
      </slot>
      <slot name='loading' v-else-if="fileStauts==='loading'" >
        loading......
      </slot>
      <slot v-else-if="fileStauts==='success'" name='success' :successData='successData'>
        success......
      </slot>
      <slot v-else-if="fileStauts==='error'" name='error' :errorData='errorData' >
        error......
      </slot>
    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive, ref, watch } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error';
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  name: '',
  props: {
    action: {
      type: String,
      required: true,
      defalut: '/upload'
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    upLoadedData: {
      type: Object
    }
  },
  inheritAttrs: false, // 组件绑定v-bind='$attrs' 可在父组件中添加class类名等
  components: {},
  setup (props, context) {
    const fileStauts = ref<UploadStatus>(props.upLoadedData ? 'success' : 'ready')
    const fileInput = ref<null | HTMLInputElement>(null)
    const successData = ref(props.upLoadedData)
    const errorData = ref()
    watch(() => props.upLoadedData, (newvalue) => {
      if (newvalue) {
        fileStauts.value = 'success'
        successData.value = newvalue
      }
    })
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handFileChage = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) return
        }
        fileStauts.value = 'loading'
        const formData = new FormData()
        formData.append('files', files[0])
        formData.append('icode', '732F8A5ABA56EA52')
        axios
          .post(props.action, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then((res) => {
            const isSuccess = res.data.code === 0
            setTimeout(() => { // test loading......
              fileStauts.value = isSuccess ? 'success' : 'error'
              context.emit(
                isSuccess ? 'file-uploaded' : 'file-uploaded-error',
                res.data
              )
              successData.value = res.data
            }, 3000)
          })
          .catch((error) => {
            fileStauts.value = 'error'
            errorData.value = error.response.data
            context.emit('file-uploaded-error', { error })
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = ''
            }
          })
      }
    }
    return {
      handFileChage,
      triggerUpload,
      fileInput,
      fileStauts,
      successData,
      errorData
    }
  }
})
</script>

<style scoped lang='scss'>
.Upload {
  cursor: pointer;
  user-select: none;
  width: 400px;
  margin: auto;
  height: 200px;
  background-color: #fafbfb;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  position: relative;
  color: #6c6c6e;
  overflow: hidden;

  &-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .clickUpload {
      margin: 15px 0px;
    }
    .instructions {
      font-size: 12px;
      color: #0068ff;
    }
  }
}
</style>
