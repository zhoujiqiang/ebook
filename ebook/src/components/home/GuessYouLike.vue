<template>
    <div class="guess-you-like">
        <title-view :label="$t('home.guessYouLike')" :btn="$t('home.change')" @onClick="change"></title-view>
        <div class="guess-you-like-list">
            <div class="guess-you-like-item" v-for="(item, index) in showData" :key="index" @click="showBookDetail(item)">
                <div class="img-wrapper">
                 <img :src="item.cover"  class="img">
                </div>
                <div class="content-wrapper" >
                    <div class="title-title-big" ref="title">{{item.title}}</div>
                    <div class="author-sub-title" ref="author">{{item.author}}</div>
                    <div class="result-third-title" ref="result">{{resultText(item)}}</div>    
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import TitleView from '../../components/home/Title'
import { ebookMixin ,ebookhome} from '../../untils/mixin'


export default {
     mixins : [ ebookMixin ,ebookhome],
    components:{
       TitleView
    },
    props:{
        data:Array
    },
    data() {
        return{
            index:0,
            total:0

        }
    },
    methods:{
        change() {
         if(this.index + 1 >= this.total){
              this.index = 0
          }else{
              this.index++
          }
          console.log(this.showData)
        },
        resultText(item){
        if(item && item.type && item.result){
            switch (item.type) {
                case 1:
                    return this.$t('home.sameAuthor').replace('$1',item.result)
                case 2:
                    return this.$t('home.sameReader').replace('$1',item.result)
                case 3:
                    return this.$t('home.readPercent').replace('$1', item.percent).replace('$2',item.result) 
            }  
        } 
    },
        resize() {
        this.$nextTick(() => {
          this.$refs.title.forEach(item => {
            item.style.width = this.width
          })
          this.$refs.author.forEach(item => {
            item.style.width = this.width
          })
          this.$refs.result.forEach(item => {
            item.style.width = this.width
          })
        })
      }
 },
    

    watch:{
        data(v) {
            this.total = v.length / 3
           
           
        }
        
    },
    computed:{
        showData() {
            if(this.data){
                return [    
                    this.data[this.index],
                    this.data[this.index + this.total],
                    this.data[this.index + this.total * 2]
                ]
            }else
            return[]
        },
         width() {
        return window.innerWidth - realPx(20) - realPx(60) + 'px'
      }
    }
}
</script>


<style lang="scss" scoped>
@import '../../assets/style/global';
.guess-you-like{   
    .guess-you-like-list{
        width: 100%;
        padding: 0 px2rem(10);
        box-sizing: border-box;
     .guess-you-like-item{
         display: flex;
         margin-top: px2rem(15);
         &:first-child{
             margin-top: px2rem(5)
         }
         .img-wrapper{
             flex:0 0 20%;
             padding: px2rem(10) px2rem(10) px2rem(10) 0;
             box-sizing: border-box;
             .img{
                 width: 100%;
             }
         }
         .content-wrapper{
             flex:1;
             padding:px2rem(20) 0;
             box-sizing: border-box;
             .title-title-big{
                 margin-top: px2rem(15);
                
             }
             .author-sub-title{
                font-size: px2rem(25);
                color: 	#696969
             }
             .result-third-title{
                 margin-top: px2rem(5);
                 font-size: px2rem(10);
                 color:	#696969
             }
         }
      }
    }
}
</style>
