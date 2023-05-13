import { createSlice } from '@reduxjs/toolkit';


const initialState: {
	selected: any;
	calendarData:any
	appointments:any,
	listItems:any
} = {
	selected: {},
	calendarData:{},
	appointments:{},
	listItems:{}
};

export const entitySlice = createSlice({
	name: 'entity',
	initialState,
	reducers: {
		
		setSelected: (state, { payload }) => {
			return { ...state, selected: payload };
		},
		setCalendarData: (state, { payload }) => {
			return { ...state, calendarData: payload };
		},
		setAppointments: (state, { payload }) => {
			return { ...state, appointments: payload };
		},
		setListItems: (state, { payload }) => {
			return { ...state, listItems: payload };
		},
		
	},
});

export const {
	setSelected,
	setCalendarData,
	setAppointments,
	setListItems
} = entitySlice.actions;
export default entitySlice.reducer;
