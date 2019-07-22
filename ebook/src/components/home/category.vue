<template>
    <div class="category">
        <title-view :label="$t('home.category')" :btn="$t('home.seeAll')"></title-view>
        <div class="category-list">
            <div class="category-item-wrapper" v-for="(item, index) in data" :key="index">
                <div class="category-item">
                    <div class="content-wrapper">
                        <div class="title-title-medium">{{categoryText(item.category)}}</div>
                        <div class="num-sub-title-tiny">{{item.num + ' ' + $t('home.books')}}</div>
                    </div>
                    <div class="img-wrapper">
                        <div class="img-group">
                            <img :src="item.img1" class="img">
                            <img :src="item.img2" class="img2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>


<script>
import TitleView from './Title'
import { categoryText } from '../../untils/store';
export default {
    components:{
        TitleView
    },
    props:{
        data:Array
    },
    methods:{
        categoryText(category){
            return categoryText(category, this)
        }
    }    
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.category{
    .category-list{
        display: flex;
        flex-flow: row wrap;
        width:100%;
        .category-item-wrapper{
            flex: 0 0 50%;
            width:50%;
            padding: 0 px2rem(5) px2rem(10) px2rem(5);
            font-size: px2rem(30);
            box-sizing: border-box;
            &:nth-child(odd){
                padding-left: px2rem(10);
            }
            &:nth-child(even){
                padding-right: px2rem(10);
            }
            .category-item{
                display:flex;
                width:100%;
                background: #eee;
                .content-wrapper{
                    .title-title-medium{}
                    .num-sub-title-tiny{
                        font-size: px2rem(5);
                        color: #696969;
                    }
                }
                .img-wrapper{
                    flex: 0 0 50%;
                    width:50%;
                    padding: px2rem(30) px2rem(100);
                    box-sizing: border-box;
                      @include left;
                    .img-group{
                        position: relative;
                        width: 100%;
                        height: px2rem(60);
                        margin-left: px2rem(50);
                      
                        .img{
                        position: absolute;
                        left: 0;
                        top:0;
                        z-index: 100;
                        width: px2rem(60);
                        height: px2rem(85);
                        }
                        .img2{
                            position: absolute;
                            left: px2rem(30);
                            top:px2rem(7.5);
                            z-index: 99;
                            width: px2rem(45);
                            height: px2rem(60);
                        }
                    }
                }
            }
        }
    }
}

</style>
