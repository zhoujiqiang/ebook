<template>
    <div class="store-home">
        <search-bar></search-bar>
        <scroll :top="scrollTop" @onScroll="onScroll" ref="Scroll">
            <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                   <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
                <div>1111</div>
                <div>1111</div>
             <div>1111</div>
              <div>1111</div>
               <div>1111</div>
      
        </scroll>
    </div>
</template>
<script>
import SearchBar from '../../components/home/SearchBar'
import Scroll from '../../components/common/Scroll'
import {StorehomeMixin} from '../../untils/mixin'
import { home } from '../../api/store'
export default {
    mixins:[StorehomeMixin],    
    components: {
        SearchBar,
        Scroll
    },
    data() {
        return{
            scrollTop:120,
            random:null
        }
    },
    methods:{
        onScroll(offsetY){
           this.setoffsetY(offsetY)
           if(offsetY > 0){
               this.scrollTop = 94
           }else{
               this.scrollTop = 120
           }
           this.$refs.Scroll.refresh()
        }
    },
    mounted (){
      home().then(Response => {
          if(Response && Response.status == 200){
              const data = Response.data
             const randomIndex =Math.floor( Math.random() * data.random.length)
             console.log(randomIndex)
             this.random = data.random[randomIndex]
             console.log(this.random)
          }
          
      })
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.store-home{
    width: 100%;
     height: 100%;

}
</style>

