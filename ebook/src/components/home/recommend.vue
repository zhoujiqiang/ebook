<template>
   <div class="recommend">
       <title-view :label="$t('home.recommend')" :btn="$t('home.seeAll')"></title-view>  
       <div class="recommend-list">
           <div class="recommend-item" v-for="(item, index) in data" :key="index">
                <div class="img-wrapper">
                    <img :src="item.cover" class="img">
                </div> 
                <div class="content-wrapper">
                    <div class="title-title-medium" ref="title">{{item.title}}</div>
                    <div class="num-sub-title" ref="num">{{$t('home.readers').replace('$1',item.readers)}}</div>
                </div> 
           </div>
       </div>
    </div> 
</template>

<script>
import TitleView from '../../components/home/Title'
export default {
    components:{
        TitleView
    },
    props:{
        data:Array
    },
    methods:{
        
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/global';
.recommend{
 .recommend-list{
     width:100%;
     @include top;
     padding: 0 px2rem(5);
     box-sizing: boder-box;
     .recommend-item{
         flex: 0 0 33.33%;
         width: 33.33%;
         padding: 0 px2rem(5);
         box-sizing: border-box;
        .img-wrapper{
            @include center;
            .img{
                width:80%;
            }
        }
        .content-wrapper{
            width:100%;
            margin-top: px2rem(10);
            @include columnCenter;
          .title-title-medium{
              text-align: center;
              font-size: px2rem(20)
              
          }
          .num-sub-title{
              margin-top: px2rem(5);
              font-size:px2rem(10);
               color:	#696969;
          }
        }
     }
 } 
}

</style>
