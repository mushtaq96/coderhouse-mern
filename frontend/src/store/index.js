import {configureStore} from '@reduxjs/toolkit'
import auth from './authSlice';
import activate from './activateSlice';

//create a Redux store
export const store = configureStore({
  reducer: {
    auth,    
    activate,
  },
});