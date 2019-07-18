import { mapGetters, mapActions } from 'vuex'
import { THEME_LIST, addCss, removeAllcss, getReadTimeByMinute } from './book'
import { Savelocation } from './localstorage'

export const ebookMixin = {
    computed:{
        ...mapGetters([
            'fileName',
            'MenuVisible',
            'SettingVisible',
            'defaultFontSize',
            'currentBook',
            'defaulatFontFamily',
            'fontFamilyVisible',
            'defaulatTheme',
            'progress',
            'bookAvailable',
            'section',
            'cover',
            'metadata',
            'navigation'    
        ]),
        themeList () {
            return THEME_LIST(this)
          }
    },
    methods:{
        ...mapActions([
             'setMenuVisible',
             'setfileName',
             'settingVisible',
             'setdefaultFontSize',
             'setcurrentBook',
             'setdefaulatFontFamily',
             'setfontFamilyVisible',
             'setdefaulatTheme',
             'setprogress',
             'setbookAvailable',
             'setsection',
             'setcover',
             'setmetadata',
             'setnavigation'
            
            ]),
            InitGlobalStyle () {
                removeAllcss()
                switch (this.defaulatTheme) {
                    case 'Default':
                        addCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_default.css')
                        break
                    case 'Eye':
                        addCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_eye.css')
                        break
                    case 'Gold':
                        addCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_gold.css')
                        break
                    case 'Night':
                        addCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_night.css')
                        break
                    default:
                        addCss(process.env.VUE_APP_RES_URL + '/epub/theme/theme_default.css')
                }
            }, 
            refreshLocation () {
                const currentLocation = this.currentBook.rendition.currentLocation()
                if (currentLocation && currentLocation.start) {
                    const startCif = currentLocation.start.cfi 
                    const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
                    this.setprogress(Math.floor(progress * 100))
                    this.setsection(currentLocation.start.index)
                    Savelocation(this.fileNmae, startCif)
                }
              },
              display (target, cb) {
                  if (target) {
                     this.currentBook.rendition.display(target).then(() => {
                         this.refreshLocation()
                         if (cb) cb()   
                     })
                  } else {
                     this.currentBook.rendition.display().then(() => {
                         this.refreshLocation() 
                     })
                  }
              },
            hidenTitleAndMenu () {
            this.setMenuVisible(false)
            this.settingVisible(-1)
            this.setfontFamilyVisible(false)
             },
            getReadTimeText () {
               return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
              }
    }
}   

export const StorehomeMixin = {
    computed:{
        ...mapGetters(['offsetY',
                    'HotSearchoffsetY'                    
        ])
    },
    methods:{
        ...mapActions(['setoffsetY',
                'setHotSearchoffsetY'                                              
                ])
    }
}