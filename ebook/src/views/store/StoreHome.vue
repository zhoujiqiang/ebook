<template>
    <div class="store-home">
        <search-bar></search-bar>
        <scroll :top="scrollTop" @onScroll="onScroll" ref="Scroll">
        <div class="banner-wrapper">
            <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"> </div>
        </div>
        </scroll>
    </div>
</template>
<script>
import SearchBar from '../../components/home/SearchBar'
import Scroll from '../../components/common/Scroll'
import {StorehomeMixin} from '../../untils/mixin'
import { home } from '../../api/store'
export default {
    mixins:[StorehomeMixin],    
    components: {
        SearchBar,
        Scroll
    },
    data() {
        return{
            scrollTop:120,
            random:null,
            banner:null
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
             console.log(randomIndex)
             this.random = data.random[randomIndex]
             this.banner = data.banner
             console.log(this.  banner)
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
}
</style>

