import { createSlice } from '@reduxjs/toolkit';


const initialState: {
	selected: any;
} = {
	selected: {},
};

export const entitySlice = createSlice({
	name: 'entity',
	initialState,
	reducers: {
		
		setSelected: (state, { payload }) => {
			return { ...state, selected: payload };
		},
		
	},
});

export const {
	setSelected,
} = entitySlice.actions;
export default entitySlice.reducer;
