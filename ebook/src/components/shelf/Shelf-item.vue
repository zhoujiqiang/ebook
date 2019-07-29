<template>
    <div class="shelf-item" :class="{'shelf-item-shadow':data.type===1 || data.type===2 }"  @click="onItemClick">
        <component :is="item" :data="data"></component>
        <div class="icon-selected"
        :class="{'is-selected':data.selected}"
         v-show="isEditMode && data.type === 1"></div>
    </div>
</template>
<script>
import { storeShelfMixin } from  '../../untils/mixin' 
import ShelfItemAdd from './Shelf-item-add' 
import ShelfItemBook from './Shelf-item-book' 
import ShelfItemCategroy from './Shelf-item-categroy' 
import {gotoStoreHome} from '../../untils/store'

export default {
  
    mixins: [storeShelfMixin],
    props:{
        data: Object
    },   
    data(){
        return{
            book:ShelfItemBook,
            category:ShelfItemCategroy,
            add:ShelfItemAdd
        }
    },
    computed:{
         item() {
             return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
         }
    },
    methods:{
            onItemClick(){
                if(this.isEditMode){
                    this.data.selected = !this.data.selected
                    if(this.data.selected){
                        this.shelfSelected.pushWithoutDuplicate(this.data)
                    }else{
                        this.setshelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
                    }
                }else{
                     if(this.data.type === 3){
                    this.$router.push({
                     path:'/store/home'
                    })
                }
                }
               
            }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/global';
.shelf-item{
    position: relative;
    width: 100%;
    height: 100%;
    &.shelf-item-shadow{
         box-shadow: px2rem(5) px2rem(5) px2rem(10) px2rem(5) rgba(29, 28, 28, 0.3)
       }
.icon-selected{
    position: absolute;
    bottom: px2rem(2);
    right: px2rem(2);
    font-size: px2rem(45);
    color: rgba(0,0,0,.4);
    &.is-selected{
        color:rgba(35, 96, 211, 0.925);
    }
}
}

</style>
