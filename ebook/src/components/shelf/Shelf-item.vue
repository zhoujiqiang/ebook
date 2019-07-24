<template>
    <div class="shelf-item" :class="{'shelf-item-shadow':data.type===1 || data.type===2 }"  @click="onItemClick">
        <component :is="item" :data="data"></component>
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
                if(this.data.type === 3){
                    this.$router.push({
                     path:'/store/home'
                    })
                }
            }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/global';
.shelf-item-shadow{
         box-shadow: px2rem(5) px2rem(5) px2rem(10) px2rem(5) rgba(29, 28, 28, 0.3)
       }
</style>
