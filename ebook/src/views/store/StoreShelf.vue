<template>
    <div class="store-shelf">
        <div class="store-title">
        <shelf-title></shelf-title>
        </div>
        <scroll class="shelf-scroll-wrapper" :top="0"
                @onScroll="onScroll">
             <shelf-search></shelf-search>
             <shelf-list :datalist="datalist"></shelf-list>
        </scroll>
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
import { AppendAddToShelf} from '../../untils/store'
export default {
    data(){
        return{
            datalist:null
        }
    },
    mixins: [storeShelfMixin],
    components:{
        ShelfTitle,
        Scroll,
        ShelfSearch,
        ShelfList
    },
    methods:{
        onScroll(offsetY){
            this.setoffsetY(offsetY)
        }

    },
    mounted() {
        shelf().then(res => {
            if (res && res.status == 200){
                const data = res.data
                this.datalist = data.bookList
                this.setShelfList (AppendAddToShelf(this.datalist))
                console.log(this.datalist)
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
