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
import { storeShelfMixin } from  '../../untils/mixin' 
import {saveBookShelf}   from'../../untils/localstorage'
export default {
    mixins: [storeShelfMixin],
    computed:{
      isSelected(){
        return this.shelfSelected && this.shelfSelected.length > 0
      },
        tabs(){
            return [
                {
                  label: this.$t('shelf.private'),
                  label2:this.$t('shelf.noPrivate'),
                  index:1
                },
                {
                  label: this.$t('shelf.download'),
                  label2:this.$t('shelf.delete'),
                  index:2
                },
                {
                  label: this.$t('shelf.move'),
                  index:3
                },
                {
                  label: this.$t('shelf.remove'),
                  index:4
                },
            ]
        },
        isPrivate(){
          if(!this.isSelected){
            return false
          }else {
            return this.shelfSelected.every(item => item.private)
          }
        }
    },
    data(){
      return{
        popupMenu:null
      }
    },
    methods:{
      hidePopup(){
        this.popupMenu.hide()
      },
      setPrivate(){
        let isPrivate
        if(this.isPrivate){
          isPrivate = false
        }else{
          isPrivate = true 
        }
        this.shelfSelected.forEach(book => {
          book.private = isPrivate 
        })  
        this.hidePopup()
        this.setISEditMode(false)
        saveBookShelf(this.ShelfList)
        if(isPrivate){
          this.simpletoast(this.$t('shelf.setPrivateSuccess'))
        }else{
            this.simpletoast(this.$t('shelf.closePrivateSuccess'))
        }
      },
      showPrivate(){
          this.popupMenu = this.popup({
          title:this.$t('shelf.setPrivateTitle'),
          btn: [
            {
              text: this.$t('shelf.open'),
              click:() => {
               this.setPrivate()
              }
            },
             {
              text:this.$t('shelf.cancel'),
              click:() => {
                this.hidePopup()
              }
             }
          ]
          }).show()
        },
      onTabClick(item){
        if(!this.isSelected){
          return
        }
        switch(item.index){
          case 1: 
          this.showPrivate()
            break
          case 2:
            break
          case 3:
            break
          case 4:
            break
          default:
            break
        }
      
      },
      label(item){
        switch(item.index){
          case 1:
            return this.isPrivate ? item.label2 : item.label
          default:
            return item.label
        }
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/global';
.shelf-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(60);
    background: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0,0,0,.1);
  .shelf-footer-tab-wrapper{
    flex: 1;
    width: 25%;
    height: 100%;
    
    .shelf-footer-tab{
      width: 100%;
      height: 100%;
      @include columnCenter;
      .tab-icon{
        font-size: px2rem(20);
        color:#666;
        opacity: .5;
       
      }
      .tab-text{
         margin-top: px2rem(5);
         font-size: px2rem(20);
         color:#666;
         opacity: .5 ;
      }
       .is-selected{
          opacity: 1;
        }
    }
  }
}
</style>
