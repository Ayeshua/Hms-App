import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GridView from '../../components/GridView';
import { calendarStatus, homeInfo } from '../../constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { reorder } from '../../utils/reorder';
import { lastDayOfMonth,subMonths,addDays,isToday,isFuture } from 'date-fns';
import useFBDocs from '../../hooks/use-store/useFBDocs';
import { setAppointments, setCalendarData, setListItems } from '../../data/redux/slices/entities';
import { isEmpty,omit } from "lodash";
import { DateTimeFormat } from '../../utils/date-formatter';
import { colors } from '../../theme/colors';
import { ToastAndroid } from 'react-native';
import { customDateEqual } from '../../utils/custom-compare';
const Home = ({navigation}) => {
	const { categoryId,userId } = useSelector(({ 
		login:{
		user:{ 
		categoryId,
		userId 
	}
	} 
	}) => {
		return { categoryId,userId }
	},shallowEqual);
	const {arr:calendarData=[]} = useSelector(({ entity }) => entity.calendarData,customDateEqual);
	const appointments = useSelector(({ entity }) => entity.appointments,customDateEqual);	
	const [isSpinner, setSpinner] = useState<boolean>(true);
	const mon=useRef(DateTimeFormat(new Date(),'yyyy-MM-dd'))
	console.log('appointments ',appointments);
	
	const [searchAppointments, setSearchAppointments] = useState<any>();
	const dispatch=useDispatch()
	const payload = useMemo(() => {
		if (categoryId !== 'Doctor') {
			return homeInfo;
		} else {
			return reorder(homeInfo, 1, null, 1, true);
		}
	}, [homeInfo, categoryId]);
	const onClickFun = ({ index }) => {
		const {title}=payload[index]
		const {currentTimestamp}=appointments||{}
		console.log('onClickFun currentTimestamp ',currentTimestamp);

		if(currentTimestamp){

			navigation.navigate('Appointment List',{currentTimestamp,title})
		}else{
			ToastAndroid.show('No appointments', ToastAndroid.SHORT);

		}
	};
	const onCalendarEvent = (currentTimestamp:number,flag:boolean) => {
		if(flag){
			const formatStr=DateTimeFormat(currentTimestamp,'yyyy-MM-dd')
				console.log('formatStr ',formatStr);
			if(appointments.markedDates[formatStr]){

				navigation.navigate('Appointment List',{currentTimestamp})
			}else{
				ToastAndroid.show('No appointments', ToastAndroid.SHORT);

			}
		}else{

			startSearch(currentTimestamp)
		}

	};
	const startSearch = useCallback((timestamp: number|Date) => {
		console.log('startSearch useCallback ', timestamp);
		mon.current=DateTimeFormat(timestamp,'yyyy-MM-dd')
		const timestamp1=subMonths(timestamp,1)
		setSearchAppointments({
			timestamp1:lastDayOfMonth(timestamp1),
			timestamp2:(addDays(lastDayOfMonth(timestamp),1)),
			path:'Appointment',
			boolValue:categoryId==='Registrar'?null:{key:userId, value:`${categoryId.toLowerCase()}Id`},
			secValue:categoryId!=='Registrar'?null:{key:[1,2,3,4],operation:'in', value:`status`}

		});
		setSpinner(true)
	}, [categoryId,userId]);
	
	useEffect(() => {
		startSearch(new Date())
	}, [startSearch])
	const resCallback=useCallback((arr)=>{
		if(!isEmpty(arr)){

			setSearchAppointments(null)
			dispatch(setCalendarData({arr,updatedAt:new Date().getMilliseconds()}))
		}else{
			setSpinner(false)

		}
	},[])
	useFBDocs(searchAppointments,resCallback)
	useEffect(()=>{

		if(!isEmpty(calendarData)){
			const marked=new Map()
			const markedItems=new Map()
			let currentTimestamp:number
			const len=calendarData.length
			for (let index = 0; index < len; index++) {
				const item = {...calendarData[index],top:26};
				const {timestamp,scheduleDate,status}=item
				const val=scheduleDate||timestamp
				const formatStr=DateTimeFormat(val,'yyyy-MM-dd')
				
				if(isToday(val)||isFuture(val)){
					currentTimestamp=val
				}
				if(!currentTimestamp&&index===len-1){
					currentTimestamp=val
				}
				console.log('formatStr ',formatStr,' val ',val,' status ',status,' marked ',marked);
				const dot=calendarStatus[status]
				if(marked.has(formatStr)){
					const obj=marked.get(formatStr)
					marked.set(formatStr,{...obj,dots:[...new Set([...obj.dots,dot])]})
					const arr=markedItems.get(formatStr)
					const firstItem=arr[0]
					arr[0]={...firstItem,top:0}
					markedItems.set(formatStr,[...new Set([item,...arr])])
				}else{
					marked.set(formatStr,{dots:[dot],selected: true, selectedColor: colors.secondary})
					markedItems.set(formatStr,[item])
				}
				
			} 
			
			
			setSpinner(false)
			const markedDates=Object.fromEntries(marked)
			console.log('formatStr currentTimestamp ',currentTimestamp,' markedDates ',markedDates);

			dispatch(setAppointments({
				markedDates,
				currentTimestamp,
				updatedAt:new Date().getMilliseconds() 
			}))
			dispatch(setListItems({
				data:Object.fromEntries(markedItems),
				updatedAt:new Date().getMilliseconds() 
			}))
		
		}
	},[calendarData])
	
	return (<GridView
		{...{
			profileInfo: payload,
			onClickFun,
			isSpinner,
			onCalendarEvent,
			currentDate:mon.current,
			calendarData:omit(appointments,'currentTimestamp','updatedAt')/* :{...currentData,current:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`} */, 
			subName:'name',
			numColumns:categoryId==="Doctor"?2:3
		}}
	/>)
};

export default Home;
