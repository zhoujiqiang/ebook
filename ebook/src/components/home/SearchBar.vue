<template>
<div>
<div class="search-bar" :class="{'hide-title':!titleVisible }">
      <transition name="title-move">
    <div class="search-bar-title-wrapper" v-show="titleVisible">
        <div class="title-icon-back-wrapper" @click="back">
               <span class="icon-back icon"> </span>
        </div>
        <div class="title-text-wrapper">
               <span class="icon-text title">{{$t('home.title')}}</span>
        </div>
        <div class="title-icon-shake-wrapper">
              <span class="icon-shake icon"> </span>
        </div>
    </div>
      </transition>
    <div class="search-bar-input-wrapper" :class="{'hide-title' :!titleVisible}">
        <div class="search-bar-blank"></div>
    <div class="search-bar-input">
        <span class="icon-search icon1"></span>
        <input class="input"
        type="text"
        :placeholder="$t('home.hint')"
        v-model="searchText" @click="showhotSearch">
    </div>
    </div>
 </div>  
 <hot-search-list v-show="hotSearchVisible"></hot-search-list>
 </div>
</template>

<script>
import {StorehomeMixin} from '../../untils/mixin'
import HotSearchList from './HotSearchList'
export default {
      mixins:[StorehomeMixin],
      components:{
          HotSearchList
      },
    data() {
        return {
            searchText:'',
            titleVisible:true,
            hotSearchVisible:false
        }
    },
    watch:{
        offsetY(offsetY) {
            if(offsetY > 0){
                this.hideTitle()
            }else{
                this.showTitle()
            }         
        }
    } ,
    methods:{
        back(){
            if(this.hotSearchVisible){
                 this.hidehotSearch()
            }else{
                this.$router.push('/store/shelf')
            }
        },
        hidehotSearch(){
            this.hotSearchVisible = false
        },
        showhotSearch(){            
            this.hotSearchVisible = true 
        },
        hideTitle(){
            this.titleVisible = false
        },
        showTitle(){
            this.titleVisible = true 
        }
    }   
}
</script>


<style lang="scss" scoped>
@import '../../assets/style/global';
.search-bar{
    position: relative;
    width:100%; 
    z-index: 150;
    &.hide.title{
        height: px2rem(52);
    }
    .search-bar-title-wrapper{
        position: relative;;
       top:0;
       left:0;
       width:100%;
       height: px2rem(80);
      .title-icon-back-wrapper{
          position:absolute;
          left: px2rem(15);
          top:px2rem(30);
          z-index: 200;
          height: px2rem(120);  
          @include center; 
      }
      .title-text-wrapper{
          position:absolute;
          width:100%;
          height: px2rem(50);
          top:px2rem(30);
          @include center;
      }
      .title-icon-shake-wrapper{
          position: absolute;
          right: px2rem(15);
          top:px2rem(30);
          height: px2rem(60);
          @include center
      }
    }
    .search-bar-input-wrapper{
        width: 100%;
        display: flex;  
        height: px2rem(70);
        margin-top: px2rem(15);
        padding: 0 px2rem(40);
        box-sizing: border-box ; 
        @include center;
        transition: top .2s linear ; 
        &.hide-title{
            top:0; 
        }
        .search-bar-blank{
            flex: 0 0 px2rem(31);
            width: px2rem(31);
        }
        .search-bar-input{
            flex:1;
        width: 100%;
        background: #f4f4f4;
        border-radius: px2rem(20);
        padding:  px2rem(5) px2rem(15);
        box-sizing: border-box ; 
        @include left ;
        border:px2rem(1) solid #eee;
        .icon-search{
        color: #999;
        }
        .input{
            width: 100%;
            padding:  px2rem(10) px2rem(10);
            border: none;
            background: transparent;
            margin-left: px2rem(10);    
            color: #666;
            &:focus{
                outline: none;  
            }
            &::-webkit-input-placeholder{
                color: #ccc;
            }
        }
    }
    }
}

</style>

