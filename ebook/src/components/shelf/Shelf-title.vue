<template>
<transition  name="fade" >
<div class="shelf-title" :class="{'hide-shadow' : ifHideShadow} " v-show="shelfTitleVisible">
    <div class="shelf-title-text-wrapper" >
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-left">
        <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
    </div>  
    <div class="shelf-title-btn-wrapper shelf-title-right">
        <span class="shelf-title-btn-text" @click="onEditClick">{{
            isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
    </div>  
</div>
</transition>
</template>

<script>
import { storeShelfMixin } from  '../../untils/mixin'   
export default {
    mixins: [storeShelfMixin],
    data(){
        return{
            ifHideShadow : true
         
        } 
    },
   
    computed:{
        selectedText() {
            const SelectNumber = this.shelfSelected ? this.shelfSelected.length : 0
            return SelectNumber <= 0 ? this.$t('shelf.selectBook') :(SelectNumber === 1 ?
            this.$t('shelf.haveSelectedBook').replace('$1',SelectNumber ):this.$t('shelf.haveSelectedBooks').replace('$1',SelectNumber ))
        }
    },
     watch:{
            offsetY(offsetY){
                if(offsetY > 0){
                   this.ifHideShadow = false    
                }else{
                   this.ifHideShadow = true
                }
            }   
    },
    methods:{
        onEditClick(){
            if(!this.isEditMode){
                this.setshelfSelected([])
                this.ShelfList.forEach(item => {item.selected = false})
            }
            this.setISEditMode(!this.isEditMode)     
        },
        clearCache(){
            alert('clear cache')
        }
        
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.shelf-title{
    position: relative;
    z-index: 200;
    width:100%;
    height: px2rem(70);
    background-color:white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0 , 0, 0.1);
    &.hide-shadow{
        box-shadow: none;
    }
    .shelf-title-text-wrapper{
        position: absolute;
        top:px2rem(20);
        left:0;
        width:100%;
        height: px2rem(42);
        @include columnCenter; 
        .shelf-title-text{
            font-size:px2rem(40);
            line-height: px2rem(50);
            font-weight: bold;
            color: #333;
        }
        .shelf-title-sub-text{
            font-size: px2rem(15);
            color: #333;
        }
    }
    .shelf-title-btn-wrapper{
        position: absolute;
        top :px2rem(20); 
        box-sizing: border-box;
        height: 100%;
        @include center;   
        .shelf-title-btn-text{
            font-size: px2rem(32);
            color:#666;
        }
        &.shelf-title-left{
            left:0;
            padding-left: px2rem(15);
        }
        &.shelf-title-right{
            right: 0;
            padding-right: px2rem(15);
        }   
    }
    
}
</style>
