import { createSlice } from '@reduxjs/toolkit';

export interface LoginState {
	user: any;
	signupMsg: any;
}

const initialState: LoginState = {
	user: {},
	signupMsg: null,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
		setSignupMsg: (state, { payload }) => {
			state.signupMsg = payload;
		},
	},
});

export const { setUser, setSignupMsg } = loginSlice.actions;
export default loginSlice.reducer;
