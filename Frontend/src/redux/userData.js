import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  carData: {},
  userData: {
    IsLoggedIn: false
  },
}

export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.carData = action.payload;
    },
    addUserData: (state) => {
      state.userData.IsLoggedIn = !state.userData.IsLoggedIn;
    },
    checkUserLoggedIn: (state) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        state.userData.IsLoggedIn = true;
      }
    },
}})

export const {addData, addUserData, checkUserLoggedIn } = userData.actions
export default userData.reducer