<template>
    <transition name="fade">
        <div class="slider-content-wrapper" v-show="MenuVisible&&SettingVisible === 3 ">
           <transition name="fade-slider-content-wrapper">
            <div class="content" v-if="SettingVisible === 3">
                <div class="content-page-wrapper" v-if="!bookAvailable">
                    <div class="content-page">
                        <component :is= "currentTab === 1 ? content:bookmark" ></component>
                    </div>
                    
                    <div class="content-page-tab">
                        <div class="content-page-tab-item" :class="{'selected':currentTab ===1 }" @click="selectTab(1)">{{$t('book.navigation')}}</div>
                    <div class="content-page-tab-item" :class="{'selected':currentTab ===2}" @click="selectTab(2)">{{$t('book.bookmark')}}</div>
                    </div>
                </div>
                <div class="content-empty" v-else>
                     <ebook-loading></ebook-loading>
                </div>  
            </div>
           </transition>
            <div class="content-bg" @click="hidenTitleAndMenu()"></div>
        </div>
    </transition>
</template>
<script>
import { ebookMixin } from '../../untils/mixin'
import EbookSliderContent from './ebook-slider-content'
import EbookSliderBookmark from './ebook-slider-bookmark'
import EbookLoading from './ebook-loading'
export default {
 mixins: [ ebookMixin ],    

 data() {
     return {
          currentTab: 1,
          content: EbookSliderContent,
          bookmark: EbookSliderBookmark 
     }
 },
  components:{
     EbookLoading
 },
 methods: {
    selectTab(tab) {
        this.currentTab=tab
    }
 }
}
</script>
 <style lang="scss" scoped>
@import '../../assets/style/global';
 .slider-content-wrapper{
    position:absolute;
    top:0;
    left: 0;
    display:flex;
    z-index: 300;
    width: 100%;
    height: 100%;
    .content{
        flex: 0 0  85%;
        width: 85%;
        height: 100%;
        .content-page-wrapper{
            display: flex;
            flex-direction: column;
            width:100%;
            height:100%;
            .content-page{
                flex: 1;
                width: 100%;
                overflow: hidden;
            }
            .content-page-tab{
                display: flex;
                flex: 0 0 px2rem(48);
                width:100%;
                height: px2rem(48); 
                .content-page-tab-item {
                    flex:1;
                    font-size: px2rem(35);
                    @include center;
                }   
            } 
        }
        .content-empty{
            width:100%;
            height:100%;
            @include center
        }
    }
    .content-bg{
        flex: 0 0 15%;
        width:15%;
        height: 100%;
        background: #888888
            } 
    
 }
</style>



