<template>
<transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
          <div calss="ebook-popup-icon" @click="hide">
              <span class="icon-down2"></span>
          </div>
          <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>   
      <div class="ebook-popup-list-wrapper">    
       <div class="ebook-popup-item"  v-for= "(item, index) in fontFamilyList" :key="index" @click="setfontfamily(item.font) "> 
        <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div> 
            <div class="ebook-popup-check" v-if="isSelected(item)">
           <span class="icon-check"></span>
            </div>
        </div>
      </div>
    </div>
</transition>
</template>
<script>
import { ebookMixin } from '../../untils/mixin'
import { FONT_FAMILY } from '../../untils/book'
import { setLocalStorage,getLocalStorage,removeLocalStorage,clearLocalStorage,SaveFontfamily  } from '../../untils/localstorage'
export default {
    data() {
        return {
            fontFamilyList: FONT_FAMILY
        }
    },
    mixins: [ ebookMixin ],
    mounted() {
      
        //console.log(getLocalStorage(this.fileName))
      
    },
    methods:{
        isSelected(item) {
            return this.defaulatFontFamily === item.font
        },
        hide() {
            this.setfontFamilyVisible(false)
        },
        setfontfamily(font){
            this.setdefaulatFontFamily(font)
            SaveFontfamily(this.fileName,font)
            if (font === 'Default'){
                this.currentBook.rendition.themes.font('Times New Roman')
            }
            else{
                 this.currentBook.rendition.themes.font(font)
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../assets/style/global';
.ebook-popup-list{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 350;
    width: 100%;
    background: white;
    box-shadow: 0 px2rem(-4) px2rem(6) rabd(0,0,0,.1);
  .ebook-popup-title{    
      position: relative;
      padding: px2rem(10);
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #b8bbb8;  
      text-align: center;
      @include center;
    .ebook-popup-icon{
        position: absolute;
        left:px2rem(15);
        top:0;
        height:100%;
        font-size:px2rem(35);
        font-weight: bold;
        text-align: center;
        @include center;
        .icon-down2{
              font-size:px2rem(35);
               font-weight: bold;
        }
    }
    .ebook-popup-title-text{ 
        position: relative; 
        width:100%;
        font-size: px2rem(35); 
        font-weight: bold;
        text-align: center;
         @include center;
    }
   }
    .ebook-popup-list-wrapper{
        .ebook-popup-item{
            display: flex;
            padding: px2rem(15 );
          .ebook-popup-item-text{ 
              flex:5;
              font-size: px2rem(30);
              text-align: left;
          &.selected {
            color: #346cb9;
            font-weight: bold;
          }
          }
          .ebook-popup-check{
              flex:5;
              text-align: right;
              .icon-check{
                 font-size: px2rem(14);
                 font-weight: bold;
                 color:  #346cb9;
              } 
          }
        }

    }
  }

</style>
