import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userDetails: "",
    userToken: {},
    userKyc: null,
}

const userSllce = createSlice({
    name: "user", 
    initialState,
    reducers: {
        setUserDetails: (state,action)=> {
            state.userDetails= action.payload.userDetails
            state.userToken= action.payload.userToken
        },
        setUserKyc: ((state, action) =>{
            state.userKyc = action.payload
        })
    }
})

export const {setUserDetails, setUserKyc} = userSllce.actions
export default userSllce.reducer