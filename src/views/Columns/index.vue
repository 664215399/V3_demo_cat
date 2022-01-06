<template>
  <div class="Detailes wrapper">
    <div class="Detailes-info">
      <div calss="banner">
        <st-banner :bannerList="bannerList"></st-banner>
      </div>
      <div class="about" v-if="detailesInfo?.name">
        <h2 class="about-name">{{detailesInfo?.name}}</h2>
        <div class="about-description">{{detailesInfo?.description}}</div>
        <div class="about-origin">
          <img :src="countryImg" alt />
          <p>{{detailesInfo?.origin}}</p>
        </div>
        <ul class="about-temperament" id="about-temperament">
          <st-tag v-for="(item,index) in temperament" :key="index">{{item}}</st-tag>
        </ul>
      </div>
      <about-skeleton v-else></about-skeleton>
    </div>
    <div class="Detailes-starlist">
      <st-star label="adaptability" :leave="detailesInfo?.adaptability"></st-star>
      <st-star label="affection_level" :leave="detailesInfo?.affection_level"></st-star>
      <st-star label="child_friendly" :leave="detailesInfo?.child_friendly"></st-star>
      <st-star label="dog_friendly" :leave="detailesInfo?.dog_friendly"></st-star>
      <st-star label="energy_level" :leave="detailesInfo?.energy_level"></st-star>
      <st-star label="experimental" :leave="detailesInfo?.experimental"></st-star>
      <st-star label="grooming" :leave="detailesInfo?.grooming"></st-star>
      <st-star label="hairless" :leave="detailesInfo?.hairless"></st-star>
      <st-star label="health_issues" :leave="detailesInfo?.health_issues"></st-star>
      <st-star label="hypoallergenic" :leave="detailesInfo?.hypoallergenic"></st-star>
      <st-star label="indoor" :leave="detailesInfo?.indoor"></st-star>
      <st-star label="intelligence" :leave="detailesInfo?.intelligence"></st-star>
      <st-star label="natural" :leave="detailesInfo?.natural"></st-star>
      <st-star label="rare" :leave="detailesInfo?.rare"></st-star>
      <st-star label="shedding_level" :leave="detailesInfo?.shedding_level"></st-star>
      <st-star label="short_legs" :leave="detailesInfo?.short_legs"></st-star>
      <st-star label="social_needs" :leave="detailesInfo?.social_needs"></st-star>
      <st-star label="stranger_friendly" :leave="detailesInfo?.stranger_friendly"></st-star>
      <st-star label="suppressed_tail" :leave="detailesInfo?.suppressed_tail"></st-star>
      <st-star label="vocalisation" :leave="detailesInfo?.vocalisation"></st-star>
      <st-star label="rex" :leave="detailesInfo?.rex"></st-star>
    </div>
  </div>
</template>

<script lang='ts'>
import StBanner from '@/components/StBanner.vue'
import StStar from '@/components/StStar.vue'
import StTag from '@/components/StTag.vue'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CountryCodeConvert, StringConvertArray } from '@/utils/index'
import { searchDetailes } from '@/api/index'
import AboutSkeleton from '@/components/Skeleton/AboutSkeleton.vue'
export default defineComponent({
  name: 'Detailes',
  props: {},
  components: {
    StBanner,
    StStar,
    StTag,
    AboutSkeleton
  },
  setup () {
    const route = useRoute()
    const currentId = route.query.id + ''
    const bannerList = ref([])
    const detailesInfo = ref()
    const temperament = ref()
    const countryImg = ref('')
    searchDetailes(currentId).then((res) => {
      setTimeout(() => {
        detailesInfo.value = res.data[0].breeds[0]
        bannerList.value = res.data.map((item: any) => {
          return { iamge: item.url, width: item.width, height: item.height }
        })
        temperament.value = StringConvertArray(
          detailesInfo.value.temperament,
          ','
        )
        countryImg.value = CountryCodeConvert(detailesInfo.value.country_code)
      }, 300000000)
    })

    return {
      bannerList,
      detailesInfo,
      temperament,
      countryImg
    }
  }
})
</script>

<style scoped lang='scss'>
.Detailes {
  min-width: 1240px;
  &-info {
    display: flex;
    padding: 20px;
    .banner {
      width: 500px;
      height: 400px;
    }
    .about {
      flex: 1;
      padding: 60px 20px 20px;
      box-sizing: border-box;
      margin-left: 20px;
      &-name {
        font-size: 24px;
      }
      &-description {
        margin: 10px 0px;
        line-height: 28px;
      }

      &-temperament {
        display: flex;
        li {
          background-color: #ecf5ff;
          display: inline-block;
          height: 32px;
          padding: 0 10px;
          line-height: 30px;
          font-size: 12px;
          color: #409eff;
          border: 1px solid #d9ecff;
          border-radius: 4px;
          box-sizing: border-box;
          white-space: nowrap;
        }
      }
      &-origin {
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 35px;
          margin-right: 10px;
        }
      }
    }
  }
  &-starlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

</style>
<style lang='scss'>

</style>
