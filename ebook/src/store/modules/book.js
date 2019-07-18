const book = {
    state: {
        fileName : '',
        MenuVisible : false,
        SettingVisible : -1, // -1表示不显示 ，0表示显示字号和字体，1表示主题设置，2表示进度条，3目录
        defaultFontSize : 16,
        currentBook : null,
        defaulatFontFamily:'Default',
        fontFamilyVisible: false,
        defaulatTheme: 'Default',
        progress: 0,
        bookAvailable: false,
        section: 0,
        cover: null,
        metadata: null,
        navigation: null,
        offsetY: 0
 },
 mutations: {
       'SET_FileName': (state, fileName) => {
         state.fileName = fileName
       },
       'SET_MenuVisible' : (state, MenuVisible) => {
        state.MenuVisible = MenuVisible
      },
      'SET_SettingVisible' : (state, SettingVisible) => {
        state.SettingVisible = SettingVisible
      },
      'SET_defaultFontSize' : (state, defaultFontSize) => {
        state.defaultFontSize = defaultFontSize
      },
      'SET_currentBook' : (state, currentBook) => {
        state.currentBook = currentBook
      },
      'SET_defaulatFontFamily' : (state, defaulatFontFamily) => {
        state.defaulatFontFamily = defaulatFontFamily
      },
      'SET_fontFamilyVisible' : (state, fontFamilyVisible) => {
        state.fontFamilyVisible = fontFamilyVisible
      },
      'SET_defaulatTheme' : (state, defaulatTheme) => {
        state.defaulatTheme = defaulatTheme
      },
      'SET_progress' : (state, progress) => {
        state.progress = progress
      },
      'SET_bookAvailable' : (state, bookAvailable) => {
        state.bookAvailable = bookAvailable
      },
      'SET_section' : (state, section) => {
        state.section = section
      },
      'SET_cover' : (state, cover) => {
        state.cover = cover
      },
      'SET_metadata' : (state, metadata) => {
        state.metadata = metadata
      },
      'SET_navigation' : (state, navigation) => {
        state.navigation = navigation
      },
      'SET_offsetY' : (state, offsetY) => {
        state.offsetY = offsetY
      }
    },
 actions: {
    
 }
} 
export default book 