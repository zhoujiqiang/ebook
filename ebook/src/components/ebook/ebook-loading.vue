<template>
<div class="book-loading">
    <div class="ebook-loading-wrapper">
        <div class="ebook-loading-item" v-for="(item, index) in data " :key="index">
            <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
                <div class="ebook-loading-line" reg="line"></div>
                <div class="ebook-loading-mask" ref="mask"></div>
            </div>
        </div>
        <div class="ebook-loading-center"></div>
    </div>
    </div>    
</template>

<script>
import { setInterval } from 'timers';
export default {
    data() {
        return{
            data:[
                    [{}, {}, {}],
                    [{}, {}, {}]
            ],
            maskWidth:[
                { value: 1 },
                { value: 1 },
                { value: 1 },
                { value: 1 },
                { value: 1 },
                { value: 1 }
            ],
            linewidth:[
                { value: 16 },
                { value: 16 },
                { value: 16 },
                { value: 16 },
                { value: 16 },
                { value: 16 }
            ],
            add: true,
            end: false
        }
    },
    /*mounted() {
        this.task = setInterval(() => { 
            this.$refs.mask.forEach((item, index) => {
                const mask = this.$refs.mask[index]
                const line = this.$refs.line[index]
                let maskWidth = this.maskWidth[index]
                let lineWidth = this.lineWidth[index]
                if(this.add) {
                  maskWidth.value++
                  lineWidth.value--
                }else{
                  maskWidth.value--
                  lineWidth.value++
                }
               
                mask.style.width = `${px2rem(maskWidth.value)}rem`
                mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`
                line.style.width = `${px2rem(lineWidth.value)}rem`
                line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`
                if(index === this.maskWidth.length - 1 ) {
                    if(this.add){
                        if(maskWidth.value === 16) {
                            this.end = true
                        }
                    }else {
                        if(maskWidth.value === 0 ) {
                            this.end = true
                        }
                    }   
                }
                if (this.end) {
                    this.add = !this.add
                    this.end = false    
                }
            })
        },500)
    }*/
}                   
</script>
<style lang='scss' scoped>
@import '../../assets/style/global';
.book-loading{
    position: relative;
    z-index: 400;
    top:px2rem(350);
    width: px2rem(200);
    height: px2rem(140);
    background: transparent;
    border: px2rem(1.5) solid #f8f8fc ;
    border-radius: px2rem(3);
    @include center;
 .ebook-loading-wrapper{
     display: flex;
     height: 100%;
     width: 100%;
     .ebook-loading-item{ 
         flex:1 ;
         display:flex;
         flex-direction: column;
         padding: px2rem(10) 0; 
         box-sizing: border-box;
        .ebook-loading-line-wrapper{
            flex:1;
            padding:px2rem(10);
            box-sizing: border-box;
          .ebook-loading-line{
              flex:  0 0 px2rem(20);
              width: px2rem(40);
              height: px2rem(2);
              background: #f8f8fc;
          }
          .ebook-loading-mask{
              flex :0 0 px2rem(10);
              width: 0;
              height: px2rem(2);
          }
         }
     }
     .ebook-loading-center{
         position: absolute;
         left:50%;
         top:0;
         width: px2rem(1.5);  
         height: 100%;
         background: #f8f8fc;
     }
 }   
}
</style>
