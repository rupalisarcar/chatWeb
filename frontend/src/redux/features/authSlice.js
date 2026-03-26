import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiostance } from "../../lib/axios";

// Api call for sign up page
export const signup = createAsyncThunk("auth/signup",async(userData,thunkApi)=>{
    try{
        const res = await axiostance.post('/auth/signup',userData)
        return res.data;
    }catch(err){
        const message =  err.response.data.message || err.message || "Something went wrong";
        const status = err.response?.status || 500;
        return thunkApi.rejectWithValue({ message, status });
    }
})

//api call for login 
export const login = createAsyncThunk("auth/login", async(userData,thunkApi)=>{
    try{
        const response = await axiostance.post("/auth/login", userData)
        console.log("login userdata", response)
        return response
    }catch(err){
        console.log("login for err", err)
        const message =  err.response.data.message || err.message || "Something went wrong";
        const status = err.response?.status || 500;
        return thunkApi.rejectWithValue({ message, status });
    }
})

// api call for check
export const checkAuth = createAsyncThunk("auth/checkAuth",async()=>{
    const res = axiostance.get('/auth/check')
    // console.log(res)
    // return res
})
export const authSlice = createSlice({
    name : "AuthSlice",
    initialState : {
        isLoggedIn : false,
        user:null,
        error:null,
        loading : false
    },
    reducers:{},
    extraReducers:(builder)=>{
        // console.log('builder = ',builder)
        // builder
        // .addCase(checkAuth.pending,(state)=>{
        //     state.loading = true
        // })
        // .addCase(checkAuth.fulfilled,(state,action)=>{
        //     console.log(state)
        //     console.log("action = ",action)
        // })
        // .addCase(checkAuth.rejected,(state)=>{
        //     console.log(state)
        //     // console.log("action = ",action)
        // })

        // builder for sign up page
        builder
        .addCase(signup.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        .addCase(signup.fulfilled,(state, action)=>{           
            state.loading = false;
            state.user=action.payload
        })
        .addCase(signup.rejected,(state,action)=>{
            console.log("action= 1=", action.payload)
            state.loading = false;
            state.error = action.payload
        })

        builder
        .addCase(login.pending,(state)=>{
            state.loading = true,
            state.error=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false,
            state.user = action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            console.log("rejected for login")
            state.loading = false;
            state.error = action.payload
        })

    }
})

// export const {checkAuth} = authSlice.actions;
export default authSlice.reducer