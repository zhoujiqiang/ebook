<template>
    <div class="ebook-slider-content">
        <div class="slide-contents-search-wrapper">
            <div class="slide-content-search-input-wrapper">
                <div class="slide-content-search-icon">
                    <span class="icon-search"></span>
                </div>
                <input class="slide-content-search-input" type= "text" 
                v-model="SearchText"
                :placeholder="$t('book.searchHint')"
                @keyup.enter.exact="Search()"
                @click="showSearchPage">
            </div>
            <div class="slide-content-cancel" v-if="SearchVisible" @click="hideSearchPage()">{{$t('book.cancel')}}</div>
        </div>
    <div class="slide-contents-book-wrapper" v-show="!SearchVisible">
            <div class="slide-contents-book-img-wrapper">
                <img :src="cover" class="slide-conrent-book-img">
            </div>
            <div class="slide-contents-book-info-wrapper">
                <div class="slide-contents-book-title">{{metadata.title}}</div>
                <div class="slide-contents-book-author">{{metadata.creator}}</div>
            </div>
            <div class="slide-content-book-progress-wrapper">
                <div class="slide-contents-book-progress">
                    <span class="progress">{{progress + '%'}}</span>
                    <span class="progress-text">{{$t('book.haveRead2')}}</span> 
                </div>
            <div class="slide-content-book-time">{{getReadTimeText()}}</div>
            </div>
        </div>
    <scroll class="slide-contents-list" 
        :top="103"
        :bottom="18"
        v-show="!SearchVisible">
        <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index" >
            <span class="slide-contents-item-label" :class="{'selected': section === index }" :style="contentItemStyle(item)" @click="displayNavgation(item.href)">{{item.label}}</span>
            <span class="slide-contents-item-page"></span>
        </div>
        </scroll>
    <scroll class="slide-search-list" 
    :top="100" 
    :bottom="30"
    v-show="SearchVisible">
    <div class="slide-search-item" v-for="(item, index) in SearchList" 
    :key="index" v-html="item.excerpt" 
    @click="displaySearch(item.cfi,true)"> </div>
    </scroll>
    
    
    </div>   
</template>
<script>
import { ebookMixin } from '../../untils/mixin'
import Scroll from '../../components/common/Scroll'
import { px2rem} from '../../untils/utils'
export default {
    components:{
        Scroll
    },
    mixins: [ebookMixin],
    data() {
        return {
            SearchVisible: false,
            SearchList: null,
            SearchText: ''
        }
    },
    methods:{
        displaySearch(target,highlight = false){
            this.display(target, () => {
                this.hidenTitleAndMenu()    
                if(highlight){
                    this.currentBook.rendition.annotations.highlight(target)
                }
            })
        },
         Search(){
             if(this.SearchText && this.SearchText.length > 0){
                this.doSearch(this.SearchText).then(list=> {
                    this.SearchList = list
                    this.SearchList.map(item =>{
                        item.excerpt = item.excerpt.replace(this.SearchText,`<span class="content-search-text">${this.SearchText}</span>`)
                        return item 
                    })
                }) 
             }
         },
         doSearch(q) {
    return Promise.all(
        this.currentBook.spine.spineItems.map(item => 
        item.load(this.currentBook.load.bind(this.currentBook)).then(item.find.bind(item, q)).finally(item.unload.bind(item)))
    ).then(results => 
    Promise.resolve([].concat.apply([], results)));
    } ,
        displayNavgation(target){
            this.display(target, () => {
            this.hidenTitleAndMenu()
            })
        },
        contentItemStyle(item) {
            return{
                marginLeft: `${px2rem(item.level * 25)}rem`,
                fontsize:  `${px2rem(item.level / 2)}rem`
            }
        },
        showSearchPage() {
            this.SearchVisible = true
        },
        hideSearchPage() {
            this.SearchVisible =  false
            this.SearchText = ''
            this.SearchList = null
        }
    },
    mounted() {
      
    }
}
</script>
<style lang="scss">
@import '../../assets/style/global';
.ebook-slider-content{
    width:100%;
    font-size: 0;
 .slide-contents-search-wrapper{
        display: flex;
        width: 100%;
        height: px2rem(36);
        margin: px2rem(30) 0 px2em(10) 0;
        padding:px2rem(30) px2rem(20);
        box-sizing: border-box;
    .slide-content-search-input-wrapper{
        flex:1;
        @include center;
    .slide-content-search-icon{
        flex:0 0 px2rem(28);
        font-size: px2rem(40);
        @include center; 
    }
    .slide-content-search-input{
        flex:1;
        width:100%;
        height: px2rem(40);
        font-size: px2rem(28);
        background: transparent;
        border: none;
    }
    }
    .slide-content-cancel{
        flex:0 0 px2rem(100);
        font-size: px2rem(35);
        @include right;
    }
    }

 .slide-contents-book-wrapper{
    display: flex;
    width: 100%;
    height:px2rem(150);
    margin-top: px2rem(30);
    padding: px2rem(20) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper{
           flex: 0 0 px2rem(80);
           .slide-conrent-book-img{
               width:px2rem(80);
               height: px2rem(120);
           }
       }
    .slide-contents-book-info-wrapper{
        flex:1;
        margin-right: px2rem(35);
        padding: px2rem(15) px2rem(30);
      .slide-contents-book-title{
          //width:px2rem(200);
          font-size:px2rem(20); 
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          white-space: normal;
          overflow: hidden;
      }
      .slide-contents-book-author{
          font-size:px2rem(20);
      }
    }
    .slide-content-book-progress-wrapper{
        flex:0 0 px2rem(90);
     .slide-contents-book-progress{
        .progress{
            font-size: px2rem(16)
        }
        .progress-text{
            font-size: px2rem(14)
        }
    }
      .slide-content-book-time{
          font-size: px2rem(12)
      }
    }
    
}
 .slide-contents-list{
     padding: 0 px2rem(15); 
     box-sizing: border-box;
    .slide-contents-item{
        padding:  px2rem(20) 0;
    .slide-contents-item-label{
      font-size: px2rem(30);
    } 
    .slide-contents-item-page{}
}
}
 .slide-search-list{
     width: 100%;
     padding: px2rem(15) px2rem(15);
     box-sizing: border-box;    
    .slide-search-item{
        font-size: px2rem(30);
        line-height: px2rem(30);    
        padding: px2rem(30) 0;
        box-sizing: border-box;
    }
 }
}










</style>
