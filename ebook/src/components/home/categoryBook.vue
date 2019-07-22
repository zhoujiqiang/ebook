<template>
    <div>
        <div class="category-book">
            <title-view :label="categoryText(data.category)" :btn="$t('home.seeAll')"></title-view>
            <div class="category-book-list">
                <div class="category-book-item"  v-for="(item, index) in data.list" :key="index">
                    <div class="img-wrapper">
                        <img :src="item.cover" class="img">
                    </div>
                    <div class="content-wrapper">
                        <div class="title-title-small" ref="title">{{item.title}}</div>
                        <div class="numsub-title-tiny" ref="author">{{item.author}}</div>
                    </div>   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TitleView from './Title'
import { categoryText } from '../../untils/store' 
export default {
    components:{
        TitleView
    },
    props:
    {
        data:Object
    },
    methods:{

           categoryText(category) {
          return categoryText(category,this)
             },
            show(){
                console.log(this.data.list)
            }
        }
    }

</script>
<style lang="scss" scoped>
@import '../../assets/style/global';
.category-book{
    .category-book-list{
        width: 100% ;
        @include top;
        padding : 0 px2rem(5);
        box-sizing: boder-box;
        .category-book-item{
            flex: 0 0 25%;
            width: 25%;
            padding: 0 px2rem(5);
            box-sizing: border-box;
            .img-wrapper{
                @include center;
                .img{
                    width: 100%;
                }
            }
            .content-wrapper{
                whidth:100%;
                margin-top: px2rem(10);
               
                .title-title-small{
                    font-size: px2rem(30);
                }
                .numsub-title-tiny{
                    margin-top: px2rem(5);
                    font-size: px2rem(5);
                    color:	#696969;
                }
            }

        }
    }
}

</style>
