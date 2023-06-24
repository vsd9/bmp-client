import { createSlice } from '@reduxjs/toolkit';

export const loggedSlice = createSlice({
  name: 'logged',
  initialState: {
    loggedIn: false,
    userId: 0,
    userType: 0,
  },
  reducers: {
    login: (state, action) => {
      // console.log(state.loggedIn)
      // state.userId=action.payload.userId;
      // state.userType=action.payload.ucatid_fk;
      return {
        loggedIn: true,
        userId: action.payload.userid,
        userType: action.payload.ucatid_fk,
      };
    },
    logout: (state, action) => {
      // console.log("In logout action")
      return {
        loggedIn: false,
        userId: 0,
        userType: 0,
      };
    },
  },
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;
