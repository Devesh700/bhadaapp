import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showAuthModal: false,
    authRedirectPath: null as string | null,
}

const partialSlice = createSlice({
    name: 'partials',
    initialState,
    reducers: {
        showAuthModal: (state, action: { payload?: string }) => {
            state.showAuthModal = true;
            state.authRedirectPath = action.payload || state.authRedirectPath;
        },
        hideAuthModal: (state)=>{
            state.showAuthModal =false;
            state.authRedirectPath = null;
        }
    }
})

export const {showAuthModal, hideAuthModal} = partialSlice.actions;
export default partialSlice.reducer;
