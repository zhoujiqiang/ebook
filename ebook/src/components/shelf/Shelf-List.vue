<template>
  <div class="shelf-List">
    <div class="shelf-list-item-wrapper" v-for="(item, index) in datalist " :key="index" >
        <shelf-item  class="shelf-item" :data="item" :style="{height: itemHeight }" ></shelf-item> 
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title-small">{{item.title}}</span>
        </div>
    </div>
  </div>
</template>
<script>
import { storeShelfMixin } from  '../../untils/mixin'   
import ShelfItem from '../../components/shelf/Shelf-item'
import { realPx } from '../../untils/utils';
 
export default {
    mixins: [storeShelfMixin],
    data(){
      return{
       
      }
    },
    components:{
      ShelfItem
    },
    computed:{
      itemHeight() {
        return ((window.innerWidth - realPx(120)) / 3 ) / 250 * 350 + 'px'
      }
    },
    props:{
      datalist:Array
    },
    methods:{
      ShowtoDetail(){}
      
    },
    mounted(){
     
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/global';
.shelf-List{
    position:absolute;
    top:px2rem(125);
    left:0;
    z-index:50;
    display: flex;
    flex-flow:row wrap; 
    width: 100%;
    padding: 0 px2rem(15) 0 px2rem(15);
    box-sizing: border-box;
    .shelf-list-item-wrapper{
     flex:0 0 33.33%;
     width: 33.33%;
     padding: px2rem(15);
     box-sizing: border-box;
     .shelf-item{
       width: 100%;
       height: 100%;
       &.shelf-item-shadow{
         box-shadow: px2rem(5) px2rem(5) px2rem(10) px2rem(5) rgba(29, 28, 28, 0.3)
       }
     }
    }
    .shelf-list-title-wrapper{
      font-size: px2rem(25);
      @include center;
      .shelf-list-title-small{
        @include center;
        font-family: 'Times New Roman', Times, serif;
      }
    }
}

</style>
