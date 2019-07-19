<template>
    <div>
        <div class="category-book">
            <title-view :label="categoryText(data.category)" :btn="$t('home.seeAll')"></title-view>
            
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
             }
        }
    }

</script>
<style lang="scss" scoped>

</style>
