import { createSlice } from '@reduxjs/toolkit';


const initialState: {
	selected: any;
	calendarData:any
	appointments:any,
	currentInfo:any,
	listItems:any,
	Registrars:any,
	Doctors:any
} = {
	selected: {},
	calendarData:{},
	appointments:{},
	currentInfo:{},
	listItems:{},
	Registrars: {
		updatedAt: new Date().getMilliseconds(),
		arr:[]
	},
	Doctors: {
		updatedAt: new Date().getMilliseconds(),
		arr:[]
	},
};

export const entitySlice = createSlice({
	name: 'entity',
	initialState,
	reducers: {
		
		setRegistrars: (state, { payload }) => {
			return { ...state, Registrars: payload };
		},
		setCurrentInfo: (state, { payload }) => {
			return { 
				...state, 
				currentInfo: {
					...state.currentInfo,
					...payload}  
				};
		},
		setDoctors: (state, { payload }) => {
			return { ...state, Doctors: payload };
		},
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
	setRegistrars,
	setDoctors,
	setCalendarData,
	setAppointments,
	setListItems,
	setCurrentInfo
} = entitySlice.actions;
export default entitySlice.reducer;
