import { createSlice } from '@reduxjs/toolkit';

const initialState: {
	proMenu: number;
	selCat: number[];
	selPost: any;
	addPost: any;
	sharedEmail: string;
	dLink: string;
	headerShown: boolean;
	selected: any;
} = {
	sharedEmail: '',
	proMenu: -1,
	selCat: [1],
	selPost: {},
	addPost: {},
	dLink: null,
	headerShown: true,
	selected: {},
};

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setSelCat: (state, { payload }) => {
			return { ...state, selCat: payload };
		},
		setSelPost: (state, { payload }) => {
			return { ...state, selPost: payload };
		},
		setAddPost: (state, { payload }) => {
			return { ...state, addPost: { ...state.addPost, ...payload } };
		},
		setSelected: (state, { payload }) => {
			return { ...state, selected: payload };
		},
		setProMenu: (state, { payload }) => {
			return { ...state, proMenu: payload };
		},
		setHeaderShown: (state, { payload }) => {
			return { ...state, headerShown: payload };
		},
		setSharedEmail: (state, { payload }) => {
			return { ...state, sharedEmail: payload };
		},
		setDlink: (state, { payload }) => {
			return { ...state, dLink: payload };
		},
	},
});

export const {
	setSelCat,
	setProMenu,
	setSharedEmail,
	setDlink,
	setHeaderShown,
	setSelected,
	setSelPost,
	setAddPost,
} = menuSlice.actions;
export default menuSlice.reducer;
