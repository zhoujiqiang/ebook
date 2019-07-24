const store = {
    state:{
        HotSearchoffsetY: 0,
        isEditMode: false,
        shelfSelected:[ 1, 2, 3 ],
        shelfTitleVisible:true,
        offsetY:0,
        ShelfList:[]

    },
    mutations: {
        SET_HotSearchoffsetY (state, offsetY) {
            state.HotSearchoffsetY = offsetY
        },
        SET_ISEditMode (state, isEditMode) {
            state.isEditMode = isEditMode
          },
        SET_ShelfSelected (state, shelfSelected) {
            state.shelfSelected = shelfSelected
         },
         SET_shelfTitleVisible (state, shelfTitleVisible) {
            state.shelfTitleVisible = shelfTitleVisible
         },
         SET_ShelfList (state, ShelfList) {
            state.ShelfList = ShelfList
         }
    }
}

export default store