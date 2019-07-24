<template>
    <div class="shelf-search-wrapper" :class="{'search-top':ifInputClicked, 'hide-shadow':ifHideShadow}">
        <div class="shelf-search" :class="{'search-top':ifInputClicked}">
            <div class="search-wrapper">
                <div class="icon-search-wrapper">
                    <span class="icon-search icon "></span>
                </div>
                <div class="search-input-wrapper">
                    <input class="search-input"
                           type="text"
                           :placeholder="$t('shelf.search')"
                           @click="onSearchClick"
                           v-model="searchText">
                </div>
                <div class="icon-clear-wrapper" 
                v-show ="searchText.length > 0 "
                @click="clearSearchText"   >
                    <span class="icon-close-circle-fill"></span>
                </div>
            </div>
              <div class="icon-locale--wrapper" v-if="!ifInputClicked" @click="switchLocale">
                <span class="icon-cn icon" v-if="lang === 'cn'"></span>
                <span class="icon-en icon" v-if="lang === 'en'"></span>
                 </div>
            <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
                <span class="cancel-text">{{$t('shelf.cancel')}}</span>
            </div>
    </div>  
    <transition name="hot-search-move-enter">
    <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div class="shelf-search-tab-item" v-for="item in tabs" :key="item.id" @click="onTabclick(item.id)">
            <span class="shelf-search-tab-text" :class="{'is-selected':item.id === selectedTab}">{{item.text}}</span>
        </div>
    </div>
   </transition>
</div>  
</template>

<script>
import { setLocalStorage } from '../../untils/localstorage';
import { storeShelfMixin } from  '../../untils/mixin'   
export default {
    mixins: [storeShelfMixin],
    data (){
        return{
            ifInputClicked:false,
            searchText:'',
            selectedTab:1,
            ifHideShadow : true
        }
    },
    computed:{
        tabs(){
            return[
                {
                    id:1,
                    text:this.$t('shelf.default'),
                },
                {
                    id:2,
                    text:this.$t('shelf.progress'),
                },
                {
                    id:3,
                    text:this.$t('shelf.purchase')
                },
            ]
        },
        lang(){
            return  this.$i18n.locale
        }
    },
     watch:{
            offsetY(offsetY){
                if(offsetY > 0 && this.ifInputClicked ){
                   this.ifHideShadow = false    
                }else{
                   this.ifHideShadow = true
                }
            }   
    },
    methods:{
        clearSearchText(){
            this.searchText = ''
        },
        switchLocale(){
            if(this.lang === 'en'){
                this.$i18n.locale = 'cn'
            }else{
                this.$i18n.locale = 'en'
            }
            setLocalStorage('locale', this.$i18n.locale)
        },
        onSearchClick() {
            this.ifInputClicked = true;
            this.setshelfTitleVisible(false)
            
        },
        onCancelClick() {
            this.ifInputClicked = false;
            this.setshelfTitleVisible(true)
        },
        onTabclick(id){
            this.selectedTab = id   
        }

    }
    
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.shelf-search-wrapper{
    position: relative;
    z-index: 100;
    width:100%;
    height: px2rem(112);
    font-size: px2rem(16);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0 , 0, 0.1);
    &.search-top{
        position:fixed;
        left:0;
    }
     &.hide-shadow{
        box-shadow: none;
    }
    .shelf-search { 
        position: absolute;
        top:px2rem(20);
        display: flex;
        left: 0;
        z-index: 105;
        width:100%;
        height: px2rem(70);
        transition: top .2s linear;
        @include center;
    &.search-top {
        top:0;
    }
    .search-wrapper {
        display:flex;
        flex:1;
        margin: px2rem(8) px2rem(20) px2rem(8) px2rem(15);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(10);  
         .icon-search-wrapper{
             flex: 0 0 px2rem(22);
             @include right ;
             .icon-search {
              padding-top: px2rem(10);
              padding-left: px2rem(10);
              font-size: px2rem(30);
             }
         }
         .search-input-wrapper{
             flex:1;
             padding:0 px2rem(20); 
            @include center;
             box-sizing: border-box;
             .search-input{
                 display: flex;
                 flex:1;
                 width: 100%;
                 font-size: px2rem(20);
                 border: none;
                 color: #333;
                &:focus {
                 outline: none;
                &::-webkit-input-placeholder{
                font-size: px2rem(14);
                color: #ccc;
                }
             }
            } 
         }
        .icon-clear-wrapper{
            flex: 0 0 px2rem(24);
            @include left;
        .icon-close-circle-fill{
            font-size: px2rem(14);
            color: #ccc;
            }
         }
      }
    }
       .icon-locale-wrapper{
        display:flex;
        flex: 0 0 px2rem(55);
       @include center;
        .icon-cn{
            flex:1;
            font-size: px2rem(40);
            color:#666;
        }
        .icon-en{
            font-size: px2rem(40);
            color:#666;
        }
         }
    .cancel-btn-wrapper{
        display: flex;
        flex: 0 0 px2rem(70);
        @include center;
        .cancel-text{
        padding-top: px2rem(20);
        font-size: px2rem(30);
        color: blue;
        }
         }
    .shelf-search-tab-wrapper{
        position: absolute;
        top:px2rem(80);
        left:0;
        z-index: 105;
        display: flex;
        width:100%;
        height: px2rem(42);
        .shelf-search-tab-item{
            flex:1;
            @include center;
            .shelf-search-tab-text{
                font-size:  px2rem(12);
                color: #999; 
            &.is-selected{
                color: blue;
                }
            }   
        }

    }
}
</style>
