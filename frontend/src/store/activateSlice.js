import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = { 
    name: '',
    avatar: ''
};

export const activateSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //reducers consists of actions
    setName: (state, action)=>{
        state.name = action.payload;
    },
    setAvatar:(state, action)=>{
        state.avatar = action.payload;
    },
  },
});

export const { setName, setAvatar } = activateSlice.actions;

export default activateSlice.reducer;
//slice is now ready
// step - 2 after creating this file is 
// register in the index.js file