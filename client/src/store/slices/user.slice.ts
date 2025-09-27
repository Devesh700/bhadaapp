import { createSlice } from "@reduxjs/toolkit";
import { IStatus } from "../types";
import { IUpgradeRequest, UserState } from "../types/user.type";
import { getUpgradeRequests, updateUserProfile } from "../thunks/user.thunk";

const initialState:UserState = {
    user:{
        status:IStatus.idle,
        data: null,
        error: null
    },
    roleUpgradeRequests:{
        status:IStatus.idle,
        data: null,
        error: null
    }
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        resetUser:(state)=>{
            state.user = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(updateUserProfile.pending, (state, action) =>{
            state.user.status = IStatus.running
        })
        builder.addCase(updateUserProfile.fulfilled, (state, action) =>{
            state.user.status = IStatus.success;
            state.user.data = action.payload.data
        })
        builder.addCase(updateUserProfile.rejected, (state, action) =>{
            state.user.status = IStatus.error;
            state.user.error = action.error.message;
        })

        builder.addCase(getUpgradeRequests.pending, (state, action) =>{
            state.roleUpgradeRequests.status = IStatus.running
        })
        builder.addCase(getUpgradeRequests.fulfilled, (state, action) =>{
            state.roleUpgradeRequests.status = IStatus.success;
            state.roleUpgradeRequests.data = action.payload.data
        })
        builder.addCase(getUpgradeRequests.rejected, (state, action) =>{
            state.roleUpgradeRequests.status = IStatus.error;
            state.roleUpgradeRequests.error = action.error.message;
        })

        
    }
})

export const {resetUser} = userSlice.actions;
export default userSlice.reducer;