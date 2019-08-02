<template>
     <div class="book-detail">
    <detail-title @back="back"></detail-title>
    <scroll class="content-wrapper"
            :top="42"
            :bottom="52"    
            ref="scroll">
    <book-info 
    :cover="cover"
    :title="title"
    :author="author"
    :desc="desc"></book-info>
    
    <div class="book-detail-content-wrapper">
      <div class="book-detail-content-title">{{$t('detail.copyright')}}</div>
      <div class="book-detail-content-list-wrapper">
        <div class="book-detail-content-row">
          <div class="book-detail-content-label">{{$t('detail.publisher')}}</div>
          <div class="book-detail-content-text">{{ publisher }}</div>
        </div>
        <div class="book-detail-content-row">
          <div class="book-detail-content-label">{{$t('detail.category')}}</div>
          <div class="book-detail-content-text">{{categoryText}}</div>
        </div> 
        <div class="book-detail-content-row">
          <div class="book-detail-content-label">{{$t('detail.lang')}}</div>
          <div class="book-detail-content-text">{{lang}}</div>
        </div>
        <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.ISBN')}}</div>
            <div class="book-detail-content-text">{{isbn}}</div>
        </div>
      </div>
      </div>
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.navigation')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper" v-if="!this.navigation" >
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
          <div class="book-detail-content-item-wrapper">
            <div class="book-detail-content-item" v-for="(item, index) in flatNavigation " :key="index">
              <div class="book-detail-content-navigation-text"
                   :class="{'is-sub': item.deep> 1}"
               
                   v-if="item.label">{{item.label}}
              </div>
            </div>
          </div>
        </div>
      </div>
       <div class="book-detail-content-wrapper" >
        <div class="book-detail-content-title">{{$t('detail.trial')}}</div>
        <div class="book-detail-content-list-wrapper" v-if="!this.displayed">
          <div class="loading-text-wrapper"  >
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
        </div>
        <div id="preview"  ref="preview"></div>
      </div>
        </scroll>
        <div class="bottom-wrapper">
      <div class="bottom-btn" @click.stop.prevent="readBook()" >{{$t('detail.read')}}</div>
      <div class="bottom-btn" >{{$t('detail.listen')}}</div>
      <div class="bottom-btn" @click.stop.prevent="addOrRemoveShelf()">
            <span class="icon-check" v-if="this.inBookShelf" ></span>
           {{inBookShelf ? $t('detail.isAddedToShelf') : $t('detail.addOrRemoveShelf')}}
      </div>
    </div>

  </div>
</template>

<script>
import DetailTitle from "../../components/detail/DetailTitle.vue";
import BookInfo from "../../components/detail/BookInfo.vue";
import Scroll from "../../components/common/Scroll";
import { detail, shelf } from "../../api/store.js";
import { fileURLToPath } from "url";
import { getLocalStorage ,getBookShelf,clearLocalStorage } from "../../untils/localstorage.js"
import { addToShelf, removeFromBookShelf } from "../../untils/book.js"
import Epub from "epubjs";
export default {
  components: {
    DetailTitle,
    BookInfo,
    Scroll
  },
  data() {
    return {
      bookItem: null,
      bookShelf:null,
      cover: null,
      metadata:null,
      categoryText:null,
      navigation:null,
      description:null,
      displayed :null,
    };
  },
  computed: {
    title() {
      return this.metadata ? this.metadata.title : ''
    },
    author() {
      return this.metadata ? this.metadata.creator : ''
    },
    publisher() {
       return this.metadata ? this.metadata.publisher : ''
    },
    lang() {
          return this.metadata ? this.metadata.language : '-'
     },
    isbn() {
          return this.metadata ? this.metadata.identifier  : '-'
    },
    desc() {
     
      if(this.description){
        return this.description.substring(0, 300)
      }else{
        return ''
        }
      },

      flatNavigation(){
         if (this.navigation) {
            return Array.prototype.concat.apply([], Array.prototype.concat.apply([], this.doFlatNavigation(this.navigation.toc)))
         }else{
           return []
         }
      },
      inBookShelf() {
        if(this.bookItem && this.bookShelf) {
           const flatShelf = (function flatten(arr) {
            return [].concat(...arr.map(v => v.itemList ? [v, ...flatten(v.itemList)] : v))
          })(this.bookShelf).filter(item => item.type === 1)
        const book = flatShelf.filter(item => item.fileName === this.bookItem.fileName)
          return book && book.length > 0
        }else {
            return false
        }
      } 
  },
  
  methods: {
    readBook(){
      this.$router.push({
        path:`/ebook/${this.categoryText}|${this.fileName}`
      })
    },
    back() {
      this.$router.go(-1);
    },
     display(location) {
        if (this.$refs.preview) {
          if (!this.rendition) {
            this.rendition = this.book.renderTo('preview', {
              width: window.innerWidth > 640 ? 640 : window.innerWidth,
              height: window.innerHeight,
              method: 'default'
            })
          }
          if (!location) {
            return this.rendition.display()
          } else {
            return this.rendition.display(location)
          }
        }
      },      
    parseBook(blob) {
      this.book = new Epub(blob)
      this.book.loaded.metadata.then(res => {
        this.metadata = res    
      })
     this.book.loaded.navigation.then(nav => {
       this.navigation = nav 
       if(this.navigation.toc && this.navigation.toc.length > 1)
        {
            const candisplay = this.display(this.navigation.toc[1].href)
        if (candisplay) {
              candisplay.then(section => {
                if (this.$refs.scroll) {
                  this.$refs.scroll.refresh()
                }
                this.displayed = true
                const reg = new RegExp('<.+?>', 'g')
                const text = section.output.replace(reg, '').replace(/\s\s/g, '')
                this.description = text
              })
            }
        }    
     })
    },
    doFlatNavigation(content, deep = 1) {
        const arr = []
        content.forEach(item => {
          item.deep = deep
          arr.push(item)
          if (item.subitems && item.subitems.length > 0) {
            arr.push(this.doFlatNavigation(item.subitems, deep + 1))
          }
        })
        return arr
      },
      addOrRemoveShelf(){
        if(this.inBookShelf){
          removeFromBookShelf(this.bookItem)
        }else{
             addToShelf(this.bookItem)
        }
        this.bookShelf = getLocalStorage('shelf')
      },
    Init() {
      this.fileName = this.$route.query.fileName
      this.categoryText = this.$route.query.category
      if (this.fileName) {
        detail({
          fileName: this.fileName
        }).then(res => {
          if (
            res.status === 200 &&
            res.data.error_code === 0 &&
            res.data.data
          ) {
            const data = res.data.data;
            this.bookItem = data;
            this.cover = data.cover;
            let rootFile = data.rootFile;
            if (rootFile.startsWith("/")) {
              rootFile = rootFile.substring(1, rootFile.length);
            }
            this.opf = `${process.env.VUE_APP_EPUB_URL}/${this.categoryText}/${
              this.fileName
            }.epub`;
            this.parseBook(this.opf);
          }
        })
      }
         this.bookShelf = getLocalStorage('shelf')    
    }
  },
  mounted() {
    this.Init();
   
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global";
.book-detail {
    width: 100%;
    background: white;
    .content-wrapper {
      width: 100%;
      .book-detail-content-wrapper {
        width: 100%;
        border-bottom: px2rem(1) solid #eee;
        box-sizing: border-box;
        .book-detail-content-title {
          font-size: px2rem(35);
          font-weight: bold;
          padding: px2rem(20) px2rem(15) px2rem(10) px2rem(15);
          box-sizing: border-box;
        }
        .book-detail-content-list-wrapper {
          padding: px2rem(10) px2rem(15);
          box-sizing: border-box;
          .loading-text-wrapper {
            width: 100%;
            .loading-text {
              font-size: px2rem(20);
              color: #666;
            }
          }
          .book-detail-content-row {
            display: flex;
            box-sizing: border-box;
            margin-bottom: px2rem(20);
            .book-detail-content-label {
              flex: 0 0 px2rem(140);
              font-size: px2rem(30);
              color: #666;
            }
            .book-detail-content-text {
              flex: 1;
              font-size: px2rem(30);
              color: #333;
            }
          }
          #preview {
          }
          .book-detail-content-item-wrapper {
            .book-detail-content-item {
              padding: px2rem(15) 0;
              font-size: px2rem(25);
              line-height: px2rem(16);
              color: #666;
              border-bottom: px2rem(1) solid #eee;
              &:last-child {
                border-bottom: none;
              }
              .book-detail-content-navigation-text {
                width: 100%;
                &.is-sub {
                  color: #666;
                }
              }
            }
          }
        }
      }
      .audio-wrapper {
        width: 100%;
        padding: px2rem(15);
        box-sizing: border-box;
        #audio {
          width: 100%;
        }
      }
    }
    .bottom-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 120;
      display: flex;
      width: 100%;
      height: px2rem(52);
      box-shadow: 0 px2rem(-2) px2rem(2) rgba(0, 0, 0, .1);
      .bottom-btn {
        flex: 1;
        color: blue;
        font-weight: bold;
        font-size: px2rem(30);
        padding-top:px2rem(15);
        @include center;
        &:active {
          color: blue-transparent;
        }
        .icon-check {
          margin-right: px2rem(5);
        }
      }
      &.hide-shadow {
        box-shadow: none;
      }
    }
  }
</style>
