<template>
  <div class="home">
    <globar-header :userInfo='userInfo'></globar-header>
    <column-list :list='list'></column-list>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobarHeader, { UserProps } from '@/components/GlobarHeader.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'Dog',
    // avatar: 'https://images.dog.ceo/breeds/dachshund/dog-1018408_640.jpg',
    description: 'NoData'
  },
  {
    id: 2,
    title: 'Dog',
    avatar: 'https://images.dog.ceo/breeds/newfoundland/n02111277_7010.jpg',
    description: 'this is  Guoteng'
  },
  {
    id: 3,
    title: 'Dog',
    avatar: 'https://images.dog.ceo/breeds/labradoodle/labradoodle-forrest.png',
    description: 'this is  Liubo'
  },
  {
    id: 4,
    title: 'Dog',
    avatar: 'https://images.dog.ceo/breeds/springer-english/n02102040_709.jpg',
    description: 'this is  Diyongbo'
  },
  {
    id: 5,
    title: 'Cat',
    avatar: 'https://cdn2.thecatapi.com/images/1ck.jpg',
    description: 'this is a Cat'
  },
  {
    id: 6,
    title: 'Cat',
    avatar: 'https://cdn2.thecatapi.com/images/3h0.jpg',
    description: 'this is a Cat'
  },
  {
    id: 7,
    title: 'Cat',
    avatar: 'https://cdn2.thecatapi.com/images/4td.jpg',
    description: 'this is a Cat'
  },
  {
    id: 8,
    title: 'Cat',
    avatar: 'https://cdn2.thecatapi.com/images/5n6.jpg',
    description: 'this is a Cat'
  },
  {
    id: 9,
    title: 'Cat',
    avatar: 'https://cdn2.thecatapi.com/images/5rn.jpg',
    description: 'this is a Cat'
  }
]
const testUser: UserProps = {
  isLogin: true,
  name: 'sutu',
  id: 0
}
export default defineComponent({
  name: 'app',
  components: { ColumnList, GlobarHeader },
  setup () {
    return {
      list: testData,
      userInfo: testUser
    }
  }
})
</script>
<style lang="scss">
</style>
