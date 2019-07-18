<template>
    <div class="ebook">
        <ebook-title> </ebook-title>
        <ebook-reader></ebook-reader>
        <ebook-menu></ebook-menu>
    </div>
</template>
<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/ebook-title'
import EbookMenu  from '../../components/ebook/ebook-menu'
import { setInterval } from 'timers';
import { SaveReadTime, getReadTime } from '../../untils/localstorage'
import { ebookMixin } from '../../untils/mixin'
export default {  
     mixins: [ ebookMixin ],
    components:{
        EbookReader,
        EbookTitle,
        EbookMenu
        },
    methods: {
        startLoopReadTime() {
            let readtime = getReadTime(this.fileName)
            if(!readtime) {
                readtime = 0
            }
            this.task = setInterval(() =>{
                readtime++
            if(readtime % 30 === 0) {
                SaveReadTime(this.fileName, readtime)
            }
            }, 1000)
        }
    },
    mounted() {
        this.startLoopReadTime()
    },
    beforeDestroy () {
        if(this.task) {
            clearInterval(this.task)
        }
    }
}
</script>

