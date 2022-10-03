import {configureStore} from '@reduxjs/toolkit'
import auth from './authSlice';

//create a Redux store
export const store = configureStore({
  reducer: {
    auth,    
  },
});