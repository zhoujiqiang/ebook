<template>
<div>
  <transition name="slide-up">
  <div class="setting-wrapper" v-show="MenuVisible&&SettingVisible === 2 ">
    <div class="setting-progress">
      <div class="read-time-wrapper">
        <span class="read-time-text">{{getReadTimeText()}}</span>
        <span class="icon-forward"></span>
      </div>
      <div class="progress-wrapper">
        <div class="progress-icon-wrapper" @click="prevSection()">
          <span class="icon-back"></span>
        </div>
        <input class="progress" type="range"
                max="100"
                min="0"
                step="1"
                @input="onProgressInput($event.target.value)"
                 @change="onProgressChange($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress"/>
        <div class="progress-icon-wrapper" @click="nextSection()">
          <span class="icon-forward"></span>
        </div>
     </div>
      <div class="text-wrapper">
        <span class="progress-section-text">{{getSectionName}}</span>
        <span class="progress-text">({{bookAvailable ? progress + '%' : $t('book.loading')}})</span>
      </div>
    </div>
  </div>
  </transition>
</div>
</template>

<script>
import { ebookMixin } from '../../untils/mixin'


export default {
  mixins: [ ebookMixin ],
  computed:{
        getSectionName() { 
       /* if (this.section) {
          const sectioninfo = this.currentBook.section(this.section)
        if(sectioninfo && sectioninfo.href && this.currentBook && this.currentBook.navigation) {
            return this.currentBook.navigation.get(sectioninfo.href).label
            //console.log(this.currentBook.navigation.get(sectioninfo.href))
          }
        }*/
        return this.section ? this.navigation[this.section].label : ''
        }
    },
  data() {
        return{ 
        }
    },
    methods: {
       onProgressChange(progress) {
          this.setprogress(progress).then(() => {
            this.displayProgress()
            this.updateProgressBg()
          })
        },
       onProgressInput(progress) {
          this.setprogress(progress).then(() => {
             this.updateProgressBg()
          })
        },
       prevSection(){
          //console.log(this.section)
          if (this.section>0 && this.bookAvailable)  {
            this.setsection(this.section - 1).then(() => {
             this.displaySection()
             this.refreshLocation()
            })
          }
        },
       nextSection(){
         // console.log(this.currentBook.spine)
          if(this.section < this.currentBook.spine.length - 1 && this.bookAvailable){
              this.setsection(this.section + 1).then(() => {
                this.displaySection()
               
              })
          }
        },
      displaySection(){ 
        const sectioninfo = this.currentBook.section(this.section)
        if(sectioninfo && sectioninfo.href) {
        this.display(sectioninfo.href)
         }
          },
      displayProgress(){
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
        this.display(cfi)
        },
      updateProgressBg(){
        this.$refs.progress.style.background =`${this.progress}% 100% `
      },
      
      update() {
          this.updateProgressBg()
        }              
    }
}  
</script>
<style lang="scss"  scoped>
@import '../../assets/style/global';
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(45);
    left: 0;
    z-index: 190;
    width: 100%;
    height: px2rem(80);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      @include center;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top:  px2rem(23);
        width: 100%;
        height: px2rem(40);
        @include center;
        font-size: px2rem(12);
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress {
          flex: 1;
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          margin: 20 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: #ceced0;
            box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .15);
            border: none;
          }
        }
        .progress-icon-wrapper {
          flex: 0 0 px2rem(22);
          font-size: px2rem(22);
          @include center;
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(5);
        width: 100%;
        font-size: px2rem(12);
        text-align: center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          line-height: px2rem(23);
          
        }
        .progress-text {
        }
      }
    }
  }
</style>
