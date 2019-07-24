<template>
    <div class="shelf-item-add">
        <span  class="icon-add"></span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/global';
.shelf-item-add{
    width: 100%;
    height: 100%;
    border: px2rem(1) solid #ccc;
    box-sizing: border-box; 
    
    @include center;
    .icon-add{
        margin-top: px2rem(60);
        font-size: px2rem(100);
        color: #ccc;
        }
}
</style>
