<template>
    <div class="ebook-reader">
        <div id="reader">
        </div>     
    </div>  
</template>
<script>
import { mapActions } from 'vuex'   
import { ebookMixin } from '../../untils/mixin'
import Epub from 'epubjs'
import { constants } from 'crypto';
import { Promise } from 'q';
import { GetBookObject, GetFontfamily, SaveFontfamily, GetFontSize, SaveFontSize ,GetTheme,SaveTheme,getLocation} from '../../untils/localstorage';
import { flatten } from '../../untils/book';
global.ePub = Epub
export default {
    mixins: [ ebookMixin ],
    methods:{
        prevPage () {
            if (this.rendition) {
                this.rendition.prev ().then(() => {
                    this.refreshLocation()
                })
                this.hidenTitleAndMenu ()
            }
        },
        nextPage () {   
            if (this.rendition) {
                this.rendition.next().then(() => {
                    this.refreshLocation()
                })
                this.hidenTitleAndMenu ()
            }
        }, 
        ToggleShowTitleAndMenu () {
            //this.$store.dispatch('setMenuVisible', !this.MenuVisible)
            this.setMenuVisible(!this.MenuVisible)
            if (this.MenuVisible){
                this.settingVisible(-1)
            }
            this.setfontFamilyVisible(false)
        },
 
        InitTheme(){
            let defaulatTheme = GetTheme (this.filename)
            if(!defaulatTheme){
                defaulatTheme = this.themeList[0].name
                SaveTheme (this.filename,defaulatTheme)
            }
             this.setdefaulatTheme (defaulatTheme)
            this.themeList.forEach(theme => {
            this.rendition.themes.register(theme.name, theme.style)
            })
            this.rendition.themes.select(this.defaulatTheme)
        },
        InitfontSize(){ let fontSize = GetFontSize (this.fileName)
                if(!fontSize) {
                    SaveFontSize(this.fileName, this.defaultFontSize)
                }else{
                    this.rendition.themes.fontSize(fontSize)
                    this.setdefaultFontSize(fontSize)
                }},
        InitFontfamily(){
                let font = GetFontfamily (this.fileName)
                if(!font){
                    SaveFontfamily(this.fileName, this.defaulatFontFamily)
                }else{
                    this.rendition.themes.font(font)
                    this.setdefaulatFontFamily(font)
                }
        },
        initRendition() {
             this.rendition = this.book.renderTo('reader', {
                width: innerWidth,
                height: innerHeight,
                method:  'default'
            })
            const location = getLocation( this.fileName)
            this.display(location,() => {
            this.InitfontSize()
            this.InitFontfamily()
            this.InitTheme()
            this.InitGlobalStyle()
            })
            
            this.rendition.hooks.content.register(constents => {
                Promise.all ([
                constents.addStylesheet(process.env.VUE_APP_RES_URL+ '/epub/fonts/daysOne.css'),
                constents.addStylesheet(process.env.VUE_APP_RES_URL+ '/epub/fonts/cabin.css'),
                constents.addStylesheet(process.env.VUE_APP_RES_URL+ '/epub/fonts/montserrat.css'),
                constents.addStylesheet(process.env.VUE_APP_RES_URL+ '/epub/fonts/tangerine.css')
                ]).then(()=> {console.log('字体加载完毕')})
              
            })
        },
        parseBook(){
            this.book.loaded.cover.then(cover => {
                this.book.archive.createUrl(cover).then(url => {
                    this.setcover(url) 
                })
            }),
            this.book.loaded.metadata.then(metadata => {
                this.setmetadata(metadata)
            })
            this.book.loaded.navigation.then(nav => {
              const navItem = flatten(nav.toc)
              
              
              function find(item, level =0) {
                  return !item.parent ? level: find (navItem.filter(parentItem => parentItem.id === item.parent)
                      [0], ++level)
                  }
                  navItem.forEach(item => {
                      item.level = find (item)
                  })
                  this.setnavigation(navItem)
              })
        },
        initGesture() {
            this.rendition.on('touchstart', event => { 
            this.touchStartX = event.changedTouches[0].clientX
            this.touchStartTime = event.timeStamp
            })
            this.rendition.on('touchend', eventp => {
            event.preventDefault ()
            event.stopPropagation ()
            const offsetX = eventp.changedTouches[0].clientX - this.touchStartX
            const time = eventp.timeStamp - this.touchStartTime
               if (time < 500 && offsetX > 40) {
                  this.prevPage ()
               } 
               else if (time < 500 && offsetX < -40) {  
                  this.nextPage ()
               }
               else {
                  this.ToggleShowTitleAndMenu ()
               }
            })
        },
        initEpub ()  {
            const Url = 'http://127.0.0.1:8000/epub/' + this.fileName + '.epub'
            this.book = new Epub(Url)  
            this.setcurrentBook(this.book)
            this.initRendition()
            this.initGesture()
            this.parseBook()
            this.book.ready.then(() => {
                return this.book.locations.generate(750 * (window.innerWidth / 375) * (GetFontSize(this.fileName) / 16))
            }).then(locations => {
                //console.log(locations)
                this.setbookAvailable(true)
                this.refreshLocation()
            })  
            
        }
    },
    mounted () {
        this.setfileName(this.$route.params.fileName.split('|').join('/')).then(() => { 
             this.initEpub()
             
            
             
             })
            
    }
}
</script>

