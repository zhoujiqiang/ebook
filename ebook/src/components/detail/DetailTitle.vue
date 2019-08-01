<template>
<div class="detail-title-wrapper">
    <div class="title-left-wrapper" @click="back">
    <span class="icon-back"></span>
    </div>
    <div class="titile-right-wrapper">
        <span class="icon-shelf icon" v-if="showShelf" @click="showBookShelf"></span>
    </div>
    <div class="title-text" v-if="title"></div>
    {{title}}
</div>
</template>

<script>
export default {
    props:{
        title:String,
        showShelf:{
            type: Boolean,
            default:true
        }
    },
    data(){
        return {
         
        }
    },
    methods:{
        showBookShelf(){
            this.$router.push('/store/shelf')
        },
        back(){
            this.$emit('back')
        }

    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global';
.detail-title-wrapper{
    position: relative;
    display: flex;
    width:100%;
    height: px2rem(60);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    font-size: px2rem(15);
    color:#666;
    .title-left-wrapper {
      position: relative;
      z-index: 200;
      flex: 1;
      margin-left: px2rem(15);
       
      @include left;
      .icon-back{
           font-size: px2rem(45);
      }
    }
    .title-right-wrapper {
      position: relative;
      z-index: 200;
      flex: 1;
      margin-right: px2rem(15);
      

      @include right;
    .icon-shelf{
          font-size: px2rem(15);
    }
    }
     .title-text {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: px2rem(42);
      font-size: px2rem(16);
      color: #333;
      @include center;
    }
    

}
</style>
