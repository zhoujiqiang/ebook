import Vue from 'vue'
import VueI18N from 'vue-i18n'
import cn from './cn'
import en from './en' 
import { Getlocale, SaveLocale } from '../untils/localstorage'

Vue.use(VueI18N)

const messages = {
    en,
    cn
}
let locale = Getlocale()
if (!locale) {
    locale = 'cn'
    SaveLocale(locale) 
}
const i18n = new VueI18N({
    locale,
    messages
})

export default i18n 