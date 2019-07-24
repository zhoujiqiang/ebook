const book = {
    fileName: state => state.book.fileName,
    MenuVisible: state => state.book.MenuVisible,
    SettingVisible: state => state.book.SettingVisible,
    defaultFontSize: state => state.book.defaultFontSize,
    currentBook: state => state.book.currentBook,
    defaulatFontFamily:state => state.book.defaulatFontFamily,
    fontFamilyVisible:state => state.book.fontFamilyVisible,
    defaulatTheme:state => state.book.defaulatTheme,
    progress:state => state.book.progress,
    bookAvailable:state => state.book.bookAvailable,
    section:state => state.book.section,
    cover:state => state.book.cover,
    metadata:state => state.book.metadata,
    navigation:state => state.book.navigation,
    offsetY:state => state.book.offsetY,
    HotSearchoffsetY:state => state.store.HotSearchoffsetY,
    isEditMode:state => state.store.isEditMode,
    shelfSelected:state => state.store.shelfSelected,
    shelfTitleVisible:state => state.store.shelfTitleVisible,
    ShelfList:state => state.store.ShelfList
}
export default book

