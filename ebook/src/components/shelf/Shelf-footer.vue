<template>
    <div class="shelf-footer" v-show="isEditMode">
      <div class="shelf-footer-tab-wrapper" v-for="item in tabs" :key="item.index" @click="onTabClick(item)">
        <div class="shelf-footer-tab" >
          <div class="icon-private tab-icon"  :class="{'is-selected': isSelected }" v-if="item.index ===1 && !isPrivate"></div>
          <div class="icon-private-see tab-icon" v-if="item.index ===1 && isPrivate"></div>
          <div class="icon-download tab-icon" :class="{'is-selected': isSelected}"  v-if="item.index ===2"></div>
          <div class="icon-move tab-icon" :class="{'is-selected': isSelected}" v-if="item.index ===3"></div>
          <div class="icon-shelf tab-icon" :class="{'is-selected': isSelected}" v-if="item.index ===4"></div>
          <div class="tab-text" :class="{'is-selected': isSelected}" >{{label(item)}}</div>
        </div>
      </div>
    </div>
</template>
<script>
import { storeShelfMixin } from "../../untils/mixin";
import { saveBookShelf } from "../../untils/localstorage";
import { download } from '../../api/store';
import { truncate } from 'fs';
export default {
  mixins: [storeShelfMixin],
  computed: {
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0;
    },
    tabs() {
      return [
        {
          label: this.$t("shelf.private"),
          label2: this.$t("shelf.noPrivate"),
          index: 1
        },
        {
          label: this.$t("shelf.download"),
          label2: this.$t("shelf.delete"),
          index: 2
        },
        {
          label: this.$t("shelf.move"),
          index: 3
        },
        {
          label: this.$t("shelf.remove"),
          index: 4
        }
      ];
    },
    isPrivate() {
      if (!this.isSelected) {
        return false;
      } else {
        return this.shelfSelected.every(item => item.private);
      }
    },
    isDownload() {
      if (!this.isSelected) {
        return false;
      } else {
        return this.shelfSelected.every(item => item.cache);
      }
    }
  },
  data() {
    return {
      popupMenu: null
    };
  },
  methods: {
    async downloadSelectBook() {
      for (let i = 0; i < this.shelfSelected.length; i++) {
       await this.downloadBook(this.shelfSelected[i]).then(
          book =>{
            book.cache = true
          }
        );
      }
    },
    downloadBook(book) {
      let text =''
      const toast = this.toast({
        text
      })
      toast.continueShow()
      return new Promise((resolve, reject) => {
        download(book, book  => {
          toast.remove()
          toast.hide()  
          resolve(book)
          console.log('下载完毕')
        },reject,ProgressEvent => {
          const progress = Math.floor(ProgressEvent.loaded / ProgressEvent.total * 100) + '%'
          const text = this.$t('shelf.progressDownload').replace('$1',`${book.fileName}.epub(${progress})`)
          toast.updataText(text)
        })
      })
    },
    hidePopup() {
      this.popupMenu.hide();
    },
    onComplete() {
      this.hidePopup();
      this.setISEditMode(false);
      saveBookShelf(this.ShelfList);
    },
    setPrivate() {
      let isPrivate;
      if (this.isPrivate) {
        isPrivate = false;
      } else {
        isPrivate = true;
      }
      this.shelfSelected.forEach(book => {
        book.private = isPrivate;
      });
      this.onComplete();
      if (isPrivate) {
        this.simpletoast(this.$t("shelf.setPrivateSuccess"));
      } else {
        this.simpletoast(this.$t("shelf.closePrivateSuccess"));
      }
    },
    removeSelectedBook() {
       
    },
    removeBook(){},
    async setDownload() {
      // let isDownload;
      // if (this.isDownload) {
      //   isDownload = false;
      // } else {
      //   isDownload = true;
      // }
      // this.shelfSelected.forEach(book => {
      //   book.cache = isDownload;
      // });
      this.onComplete();
      if(this.isDownload) {
        this.simpletoast(this.$t("shelf.removeDownloadSuccess")); 
      } else{
       await this.downloadSelectBook()
       console.log('aaa')
         this.simpletoast(this.$t("shelf.setDownloadSuccess"));
      }
    
      this.downloadSelectBook();
      // if (isDownload) {
      //  
      // } else {
      //   
      // }
    },
    removeSelected() {
      this.shelfSelected.forEach(selected => {
        this.setShelfList(this.ShelfList.filter(book => book !== selected));
      });
      this.setshelfSelected([]);
      this.onComplete();
    },
    showPrivate() {
      this.popupMenu = this.popup({
        title: this.isPrivate
          ? this.$t("shelf.closePrivateTitle")
          : this.$t("shelf.setPrivateTitle"),
        btn: [
          {
            text: this.isPrivate
              ? this.$t("shelf.close")
              : this.$t("shelf.open"),
            click: () => {
              this.setPrivate();
            }
          },
          {
            text: this.$t("shelf.cancel"),
            click: () => {
              this.hidePopup();
            }
          }
        ]
      }).show();
    },
    showDownload() {
      this.popupMenu = this.popup({
        title: this.isDownload
          ? this.$t("shelf.removeDownloadTitle")
          : this.$t("shelf.setDownloadTitle"),
        btn: [
          {
            text: this.isPrivate
              ? this.$t("shelf.delete")
              : this.$t("shelf.open"),
            click: () => {
              this.setDownload();
            }
          },
          {
            text: this.$t("shelf.cancel"),
            click: () => {
              this.hidePopup();
            }
          }
        ]
      }).show();
    },
    showRemove() {
      let title;
      if (this.shelfSelected.length === 1) {
        title = this.$t("shelf.removeBookTitle").replace(
          "$1",
          `《${this.shelfSelected[0].title}》`
        );
      } else {
        title = this.$t("shelf.removeBookTitle").replace(
          "$1",
          this.$t("shelf.selectBooks")
        );
      }
      this.popupMenu = this.popup({
        title: title,
        btn: [
          {
            text: this.$t("shelf.removeBook"),
            type: "danger",
            click: () => {
              this.removeSelected();
            }
          },
          {
            text: this.$t("shelf.cancel"),
            click: () => {
              this.hidePopup();
            }
          }
        ]
      }).show();
    },
    onTabClick(item) {
      if (!this.isSelected) {
        return;
      }
      switch (item.index) {
        case 1:
          this.showPrivate();
          break;
        case 2:
          this.showDownload();
          break;
        case 3:
          break;
        case 4:
          this.showRemove();
          break;
        default:
          break;
      }
    },
    label(item) {
      switch (item.index) {
        case 1:
          return this.isPrivate ? item.label2 : item.label;
        default:
          return item.label;
          break;
        case 2:
          return this.isDownload ? item.label2 : item.label;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/global";
.shelf-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: px2rem(60);
  background: white;
  box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, 0.1);
  .shelf-footer-tab-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;

    .shelf-footer-tab {
      width: 100%;
      height: 100%;
      @include columnCenter;
      .tab-icon {
        font-size: px2rem(20);
        color: #666;
        opacity: 0.5;
      }
      .tab-text {
        margin-top: px2rem(5);
        font-size: px2rem(20);
        color: #666;
        opacity: 0.5;
      }
      .is-selected {
        opacity: 1;
      }
    }
  }
}
</style>
