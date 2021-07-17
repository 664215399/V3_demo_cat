<template>
  <div class="detailes">
    <div class="detailes-wrapper">
      <div class="detailes-wrapper-row ">
        <h2>OPERATION:</h2>
        <h1 class="operate">
          <p @click='editCurrentPosts'>EDITOR</p>
          <p @click="deleteCurrentPosts">DELETE</p>
        </h1>

      </div>
      <div class="detailes-wrapper-row">
        <h2>COLUMN_ID:</h2>
        <h1>{{detaileInfo.column}}</h1>
      </div>
      <div class="detailes-wrapper-row">
        <h2>DATA_ID:</h2>
        <h1>{{detaileInfo._id}}</h1>
      </div>
      <div class="detailes-wrapper-row">
        <h2>IMAGE_ID:</h2>
        <h1>{{detaileInfo.image?._id}}</h1>
      </div>
      <div class="detailes-wrapper-row">
        <h2>IMAGE_URL:</h2>
        <h1>{{detaileInfo.image?.url}}</h1>
      </div>
      <div class="detailes-wrapper-row">
        <h2>CREATED_AT:</h2>
        <h1>{{detaileInfo.createdAt}}</h1>
      </div>
      <div class="detailes-wrapper-row">
        <h2>UPDATED_AT:</h2>
        <h1>{{detaileInfo.updatedAt}}</h1>
      </div>
      <div class="detailes-wrapper-row">
        <h2>TITLE:</h2>
        <h1>{{detaileInfo.title}}</h1>
      </div>
      <div class="detailes-wrapper-row">
        <h2>CONTENT:</h2>
        <h1>{{detaileInfo.content}}</h1>
      </div>

    </div>

  </div>
</template>

<script lang='ts'>
import { getMyColumnsDetailes, deletePosts } from '@/api/login'
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import createMessage from '@/hook/createMessage'
import stConfirm from '@/hook/stConfirm'
export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup () {
    const data = reactive({})
    const route = useRoute()
    const Did = route.query.id + ''
    const detaileInfo = ref({})
    const router = useRouter()
    getMyColumnsDetailes(Did).then((res) => {
      if (res) {
        detaileInfo.value = res.data
      }
    })
    const deleteCurrentPosts = () => {
      stConfirm.show({
        cancel () {
          // createMessage('Cancelled operation', 'default')
        },
        confirm () {
          deletePosts(Did).then((res:any) => {
            if (res.code === 0) {
              createMessage('The article was deleted successfully', 'success')
              setTimeout(() => {
                router.push('/MyColum')
              }, 2000)
            } else {
              createMessage('Failed to delete article', 'error')
            }
          })
        }
      })
    }
    const editCurrentPosts = () => {
      router.push(`/Create?id=${Did}`)
    }
    return {
      detaileInfo,
      deleteCurrentPosts,
      editCurrentPosts,
      ...toRefs(data)
    }
  }
})
</script>

<style scoped lang='scss'>
.detailes {
  color: #ffffff;
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  background: url("../../assets/images/detailes_b.jpeg") no-repeat center
    bottom/cover;
  &-wrapper {
    width: 1200px;
    height: 100%;
    margin: auto;
    box-sizing: border-box;
    padding-top: 100px;

    &-row {
      align-items: center;
      line-height: 50px;
      display: flex;
      .operate {
        display: flex;
        p {
          cursor: pointer;
          user-select: none;
          font-size: 30px;
          font-weight: 600;
          margin-right: 20px;
        }
      }
      h1 {
        margin-left: 20px;
        width: calc(100% - 220px);
      }
      h2 {
        text-align: right;
        min-width: 200px;
      }
    }
  }
}
</style>
