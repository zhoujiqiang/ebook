<template>
    <div class="store-shelf">
        <div class="store-title">
        <shelf-title></shelf-title>
        </div>
        <scroll class="shelf-scroll-wrapper" 
            :top="0"
            :bottom="scrollBottom"
            @onScroll="onScroll"
            ref="Scroll">
             <shelf-search></shelf-search>
             <shelf-list :datalist="ShelfList"></shelf-list>
        </scroll>
        <shelf-footer></shelf-footer>
    </div>    
</template>

<script>
import ShelfTitle from '../../components/shelf/Shelf-title' 
import ShelfSearch from '../../components/shelf/Shelf-Search'  
import ShelfList from '../../components/shelf/Shelf-List'
import { storeShelfMixin } from  '../../untils/mixin'   
import Scroll from '../../components/common/Scroll'
import {  home } from '../../api/store'
import { shelf } from '../../api/store'
import { AppendAddToShelf } from '../../untils/store'
import ShelfFooter from '../../components/shelf/Shelf-footer'
import { getBookshelf,getLocalStorage } from '../../untils/localstorage'
export default {
    watch:{
        isEditMode(isEditMode){
            this.scrollBottom = isEditMode ? 48 : 0
            this.$nextTick(()=>{
                this.$refs.Scroll.refresh()
            })
          
        }
    },
    data(){
        return{
            datalist:null,
            scrollBottom:0,
            
            
        }
    },
    mixins: [storeShelfMixin],
    components:{
        ShelfTitle,
        Scroll,
        ShelfSearch,
        ShelfList,
        ShelfFooter
    },
    methods:{
        onScroll(offsetY){
            this.setoffsetY(offsetY)
        }

    },
    mounted() {
        // this.datalist = getLocalStorage('shelf')
        // console.log(this.datalist)
        shelf().then(res => {
            if (res && res.status == 200){
                const data = res.data
            this.datalist = data.bookList
            this.setShelfList (AppendAddToShelf(this.datalist))
            this.setShelfList (getLocalStorage('shelf'), this.bookList)
            this.datalist = this.ShelfList        
            }
        })    
    }    
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.store-shelf{
    position: relative;
    width:100%;
    height: 100%;
    background: white;
.store-title{
    position: relative;
    z-index:200;
    left: 0;
} 
.shelf-scroll-wrapper{
    position:relative;
    top:0;
    left:0;
    z-index:50;
    @include center;
}
}
</style>
