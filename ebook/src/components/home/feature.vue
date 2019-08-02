<template>
    <div class="featured">
        <title-view :label="titleText" :btn="btnText"></title-view>
        <div class="featured-list">
        <div class="featured-item-wrapper">
            <div class="featured-item" v-for="(item,index) in data " :key="index" @click="showBookDetail(item)" >
                <div class="img-wrapper">
                    <img :src="item.cover"  class="img">
                </div>
                <div class="content-wrapper">
                    <div class="title-title-small" ref="title">{{item.title}}</div>
                    <div class="author-suv-title-tiny" ref="author">{{item.author}}</div>
                    <div class="category-third-title-tiny" ref="category">{{categoryText(item.category)}}</div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import TitleView from '../../components/home/Title'
import { ebookMixin ,ebookhome} from '../../untils/mixin'
import { categoryText } from '../../untils/store'
export default {
     mixins : [ ebookMixin ,ebookhome],
    components:{
         TitleView
    },
    props:{
        data:Array,
        titleText:{
            type: String
        },
        btnText:{
            type:String
        }
    },
    computed:{
         width() {
        return window.innerWidth - realPx(20) - realPx(60) + 'px'
      }
    },
    methods:{
          resize() {
        this.$nextTick(() => {
          this.$refs.title.forEach(item => {
            item.style.width = this.width
          })
          this.$refs.author.forEach(item => {
            item.style.width = this.width
          })
          this.$refs.category.forEach(item => {
            item.style.width = this.width
          })
        })
      } ,
      categoryText(category) {
          return categoryText(category,this)
      }
    }
    
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.featured{
    .featured-list{
        width: 100%;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        .featured-item-wrapper{
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: flex-start;
            .featured-item{
                flex: 0 0 50%;
                width: 50%;
                padding: px2rem(5) 0;
                @include top;
                .img-wrapper{
                    flex: 0 0 30%;
                    width:30%;
                .img{
                    width: 100%
                }
            }
            .content-wrapper{
                flex:1;
                width:px2rem(117);
                padding: 0 px2rem(5);
                box-sizing: border-box;
                .title-title-small{
                    margin-top: px2rem(15);
                    font-size: px2rem(20);
                }
                .author-suv-title-tiny{
                    margin-top: px2rem(5);
                    font-size: px2rem(30);
                }
                .category-third-title-tiny{
                    font-size: px2rem(20);
                    color:	#696969;
                }
            }
 
            }
            
        }
    }
}
</style>   
