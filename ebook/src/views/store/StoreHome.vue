<template>
    <div class="store-home">
        <search-bar></search-bar>
        <scroll :top="scrollTop" @onScroll="onScroll" ref="Scroll">
        <div class="banner-wrapper">
            <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"> </div>
        </div>
        <guess-you-like :data="guessYouLike"></guess-you-like>
        <recommend :data="Recommend" class="recommend"></recommend>
        <featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured"></featured>
         <div class="category-list-wrapper" v-for="(item, index) in categoryList">
           <category-book :data="item"></category-book>   
         </div>
         <category class="category" :data="categories"></category>
        </scroll>
    </div>
</template>
<script>
import SearchBar from '../../components/home/SearchBar'
import Scroll from '../../components/common/Scroll'
import { StorehomeMixin } from '../../untils/mixin'
import { home } from '../../api/store'
import GuessYouLike from '../../components/home/GuessYouLike'
import Recommend from '../../components/home/recommend'
import Featured from '../../components/home/feature'
import CategoryBook from '../../components/home/categorybook'
import { categoryList } from '../../untils/store'
import Category from '../../components/home/category'
export default {
    mixins:[ StorehomeMixin ],    
    components: {
        SearchBar,
        Scroll,
        GuessYouLike,
        Recommend,
        Featured,
        CategoryBook,
        Category
    },
    data() {
        return{
            scrollTop:120,
            random:null,
            banner:null,
            guessYouLike: null,
            Recommend: null,
            featured:null,
            categoryList:null,
            categories: null
        }
    },
    methods:{
        onScroll(offsetY){
           this.setoffsetY(offsetY)
           if(offsetY > 0){
               this.scrollTop = 94
           }else{
               this.scrollTop = 120
           }
           this.$refs.Scroll.refresh()
        }
    },
    mounted (){
      home().then(Response => {
          if(Response && Response.status == 200){
             const data = Response.data
             const randomIndex =Math.floor( Math.random() * data.random.length)
             this.random = data.random[randomIndex]
             this.banner = data.banner
            this.guessYouLike = data.guessYouLike
            this.Recommend = data.recommend
            this.featured = data.featured
            this.categoryList = data.categoryList
            this.categories = data.categories
          }
      })
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.store-home{
    width: 100%;
     height: 100%; 
 .banner-wrapper{
     width:100%;
     padding: px2rem(15);
     box-sizing: border-box;
     .banner-img{
         width: 100%;
         height: px2rem(300);
         background-repeat: no-repeat;
         background-size: 100% 100%; 

     }
 }
 .recommend{
     margin-top: px2rem(20);
 }
 .featured{
     margin-top: px2rem(20);
 }
 .category-list-wrapper{
     margin-top: px2rem(20);
 }
 .category{
      margin-top: px2rem(20);
 }
}
</style>

