<template>
<transition name="hot-search-move">
<scroll class="hot-search-wrapper"
        :top="52"
        @onScroll="onScroll"
        ref="scorll">
        <hot-search :label="$t('home.hotSearch')"
                    :btn ="$t('home.change')"
                    :hotSearch="searchList.hotSearch">
        </hot-search>
        <div class="line"></div>
        <hot-search :laber="$t('home.historySearch')"
                    :btn="$t('home.clear')"
                    :hotSearch="searchList.historySearch"></hot-search>
</scroll>   
</transition>
</template>

<script>
import {StorehomeMixin} from '../../untils/mixin'
import Scroll from '../../components/common/Scroll' 
import HotSearch from '../../components/home/hotSearch'
export default {
     mixins:[StorehomeMixin],
     components:{
         Scroll,
         HotSearch
     },
    methods:{
        onScroll(offsetY) {
            this.setHotSearchoffsetY(offsetY)
        }
    },
    data() {
        return{
            searchList:{
                hotSearch:[
                    {
                        type:1,
                        text:'Self-Reported Population Health',
                        num:'1.8万'
                    },
               
                {
                    type: 1, 
                    text : 'hello-techonlogy',
                    num : '2万'

                },
                  {
                        type:1,
                        text:'Self-Reported Population Health',
                        num:'1.8万'
                    },
               
                {
                    type: 1, 
                    text : 'hello-techonlogy',
                    num : '2万'

                },
                  {
                        type:1,
                        text:'Self-Reported Population Health',
                        num:'1.8万'
                    },
               
                {
                    type: 1, 
                    text : 'hello-techonlogy',
                    num : '2万'

                },
                  {
                        type:1,
                        text:'Self-Reported Population Health',
                        num:'1.8万'
                    },
               
                {
                    type: 1, 
                    text : 'hello-techonlogy',
                    num : '2万'

                },
                  {
                        type:1,
                        text:'Self-Reported Population Health',
                        num:'1.8万'
                    },
               
                {
                    type: 1, 
                    text : 'hello-techonlogy',
                    num : '2万'

                },
                  {
                        type:1,
                        text:'Self-Reported Population Health',
                        num:'1.8万'
                    },
               
                {
                    type: 1, 
                    text : 'hello-techonlogy',
                    num : '2万'

                },
                  {
                        type:1,
                        text:'Self-Reported Population Health',
                        num:'1.8万'
                    },
               
                {
                    type: 1, 
                    text : 'hello-techonlogy',
                    num : '2万'

                }
                 ],
                 historySearch:[
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     },
                     {
                         type:2,
                         text:'java'
                     },
                     {
                         type:2,
                         text:'python'
                     }
                 ]
            }
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.hot-search-wrapper{
 width:100%;
 height: 100%;
 z-index: 1000;
 background: white;
    .line{
     width:100%;
     height: 0;
     border-top: px2rem(1) solid #eee;
     margin: px2rem(10) 0;    
    }
}

</style>
