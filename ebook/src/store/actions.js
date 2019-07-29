const actions = {
    'setfileName': ({ commit }, fileName) => { 
        return commit('SET_FileName', fileName)
     },
     'setMenuVisible' :({ commit }, MenuVisible) => {
       return commit('SET_MenuVisible', MenuVisible)
     },
     'settingVisible' :({ commit }, SettingVisible) => {
        return commit('SET_SettingVisible', SettingVisible)
      },
      'setdefaultFontSize' :({ commit }, defaultFontSize) => {
        return commit('SET_defaultFontSize', defaultFontSize)
      },
      'setcurrentBook' :({ commit }, currentBook) => {
        return commit('SET_currentBook', currentBook)
      },
      'setdefaulatFontFamily' :({ commit }, defaulatFontFamily) => {
        return commit('SET_defaulatFontFamily', defaulatFontFamily)
      },
      'setfontFamilyVisible' :({ commit }, fontFamilyVisible) => {
        return commit('SET_fontFamilyVisible', fontFamilyVisible)
      },
      'setdefaulatTheme' :({ commit }, defaulatTheme) => {
        return commit('SET_defaulatTheme', defaulatTheme)
      },
      'setprogress' :({ commit }, progress) => {
        return commit('SET_progress', progress)
      },
      'setbookAvailable' :({ commit }, bookAvailable) => {
        return commit('SET_bookAvailable', bookAvailable)
      },
      'setsection' :({ commit }, section) => {
        return commit('SET_section', section)
      },
      'setcover'  :({ commit }, cover) => {
        return commit('SET_cover', cover)
      },
      'setmetadata' :({ commit }, metadata) => {
        return commit('SET_metadata', metadata)
      },
      'setnavigation' :({ commit }, navigation) => {
        return commit('SET_navigation', navigation)
      },
      'setoffsetY' :({ commit }, offsetY) => {
        return commit('SET_offsetY', offsetY)
      },
      'setHotSearchoffsetY': ({ commit }, offsetY) => {
        return commit('SET_HotSearchoffsetY', offsetY)
      },
      'setISEditMode': ({ commit }, ISEditMode) => {
        return commit('SET_ISEditMode', ISEditMode)
      },
      'setshelfSelected': ({ commit }, shelfSelected) => {
        return commit('SET_ShelfSelected', shelfSelected)
      },
      'setshelfTitleVisible':({ commit }, shelfTitleVisible) => {
        return commit('SET_shelfTitleVisible', shelfTitleVisible)
      },
      'setShelfList':({ commit }, ShelfList) => {
        return commit('SET_ShelfList', ShelfList)
      }
}
export default actions