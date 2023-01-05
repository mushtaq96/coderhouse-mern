import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isAuth: false,
	user: null,
	otp: {
		phone: "",
		hash: "",
	},
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		//reducers consists of actions
		setAuth: (state, action) => {
			const { user } = action.payload;
			state.user = user;
			//logic is user is logged out
			if (user == null) {
				state.isAuth = false;
			} else {
				state.isAuth = true;
			}
		},
		setOtp: (state, action) => {
			const { phone, hash } = action.payload;
			state.otp.phone = phone;
			state.otp.hash = hash;
		},
	},
});

export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
