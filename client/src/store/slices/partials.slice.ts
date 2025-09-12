import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showAuthModal: false,

}

const partialSlice = createSlice({
    name: 'partials',
    initialState,
    reducers: {
        showAuthModal: (state) => {
            state.showAuthModal = true;
        },
        hideAuthModal: (state)=>{
            state.showAuthModal =false;
        }
    }
})

export const {showAuthModal, hideAuthModal} = partialSlice.actions;
export default partialSlice.reducer;