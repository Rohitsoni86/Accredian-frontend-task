import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Make API CALLS


export const registerNewUser = createAsyncThunk("UserSignup", async (dataObj) => {
    
    let dataF = JSON.stringify(dataObj);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/signup/createnewuser",
        dataF,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     return true;
    } catch (err) {
      console.log(err);
     return false;
    }
  });


//Define Initial State

const initialState = {
    isLoading: true,
    isError: false,
    isUserCreated: false,
  };

  export const userRegisterSlice = createSlice({
    name: "userRegisterDetails",
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
      builder.addCase(registerNewUser.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(registerNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUserCreated = action.payload;
      });
      builder.addCase(registerNewUser.rejected, (state, action) => {
        state.isError = true;
      });
    },
  });

export default userRegisterSlice.reducer;

