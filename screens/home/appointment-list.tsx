import { useCallback, useEffect,  useRef,  useState } from 'react';
import { calendarStatus, keyStatus } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { lastDayOfMonth,subMonths,addDays } from 'date-fns';
import useFBDocs from '../../hooks/use-store/useFBDocs';
import {  setAppointments, setCalendarData, setCurrentInfo, setListItems } from '../../data/redux/slices/entities';
import { isEmpty } from "lodash";
import { DateTimeFormat } from '../../utils/date-formatter';
import { colors } from '../../theme/colors';
import { Agenda } from 'react-native-calendars';
import GridItem from '../../components/GridItem';
import { omit,startCase } from "lodash";
import { NestedObjToInfoString, appendText } from '../../utils/renderText';
import { customDateEqual } from '../../utils/custom-compare';

const Home = ({navigation,route:{params:{currentTimestamp,title}}}) => {
	const user  = useSelector(({ login }) => login.user,customDateEqual);
	const { categoryId,userId }=user
	const {arr:calendarData=[]} = useSelector(({ entity }) => entity.calendarData,customDateEqual);
	const {data={}} = useSelector(({ entity }) => entity.listItems,customDateEqual);
	const appointments={} = useSelector(({ entity }) => entity.appointments,customDateEqual);
	//const [isSpinner, setSpinner] = useState<boolean>(true);
	const spinnerRef=useRef(currentTimestamp)
	const [searchAppointments, setSearchAppointments] = useState<any>();
	const dispatch=useDispatch()
	console.log('listItems listItems ',data);

	const startSearch = (timestamp: number) => {
		console.log('startSearch useCallback ', timestamp);
		spinnerRef.current=timestamp
		const timestamp1=subMonths(timestamp,1)
		let key=keyStatus[title]
		if(categoryId==='Registrar'&&title==='Requested'){
			key=[1]
		}
		setSearchAppointments({
			timestamp1:lastDayOfMonth(timestamp1),
			timestamp2:(addDays(lastDayOfMonth(timestamp),1)),
			path:'Appointment',
			boolValue:categoryId==='Registrar'?null:{key:userId, value:`${categoryId.toLowerCase()}Id`},
			secValue:!title?null:{key,operation:'in', value:`status`}
		});
	};
	
	const resCallback=useCallback((arr)=>{
		setSearchAppointments(null)
		dispatch(setCalendarData({arr,updatedAt:new Date().getTime()}))
	},[])
	useFBDocs(searchAppointments,resCallback)
	useEffect(()=>{

		if(!isEmpty(calendarData)){
			const marked=new Map()
			const markedItems=new Map()
			for (let index = 0; index < calendarData.length; index++) {
				const item = {...calendarData[index],top:26};
				const {timestamp,status}=item
				if(!title||keyStatus[title].includes(status)){

					const formatStr=DateTimeFormat(timestamp,'yyyy-MM-dd')
					console.log('formatStr ',formatStr,' status ',status);
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
				
			} 
			
			console.log('listItems ',marked);
			const payload=markedItems.size===0?{
				data:{[DateTimeFormat(spinnerRef.current,'yyyy-MM-dd')]:[]},
				updatedAt:new Date().getTime() }:
				{
					data:Object.fromEntries(markedItems),
					updatedAt:new Date().getTime() 
				}
			dispatch(setAppointments({
				markedDates:Object.fromEntries(marked),
				updatedAt:new Date().getTime() 
			}))
			dispatch(setListItems(payload))
		}else{
			dispatch(setListItems({
				data:{[DateTimeFormat(spinnerRef.current,'yyyy-MM-dd')]:[]},
				updatedAt:new Date().getTime() 
			}))

		}
	},[calendarData,title])
	
	const onClickFun=(appointment:any)=>{
		let currentUser={}
		if(categoryId==='Patient'){
			currentUser=omit(user,'status')
		}else if(categoryId==='Doctor'&&appointment.doctorId===userId){
			const {name,speciality}=user
			currentUser={Doctor:appendText(['[',startCase(name),':',userId,']']),speciality}
		}else if(categoryId==='Registrar'&&appointment.registrarId===userId){
			const {name}=user
			currentUser={Registrar:appendText(['[',startCase(name),':',userId,']'])}
		}
		dispatch(setCurrentInfo({Appointment:{
			...appointment,
			...currentUser,
			updatedAt:new Date().getTime() 
		}}))
		navigation.navigate('Info',{
			
			userId:appointment.patientId,
			categoryId:'Patient',
			screenName:'Appointment'
		})
	}
	return (<Agenda
		items={data}
		style={{ height: 600 }}
		loadItemsForMonth={({timestamp}) => {
			console.log('trigger items loading ',timestamp,);
			//loadItems(month)
			startSearch(timestamp)
		  }}
		  {...appointments}
		  selected={DateTimeFormat(currentTimestamp,'yyyy-MM-dd')}
		  renderItem={({status,details,timestamp,scheduleDate,top,id,...rest}:any) => {
			console.log('status ',status,' details ',details);			

			return <GridItem 
				payload={{...calendarStatus[status],info:NestedObjToInfoString({
					name:scheduleDate?DateTimeFormat(scheduleDate,'HH:mm:ss'):null,
					details:details.length>88?`${details.substring(0,88)}...`:details,
					id:`~${id}~`,

					agender:DateTimeFormat(timestamp)
				})}} 
				orientation='row' 
				onClickFun={()=>onClickFun({status,details,timestamp,scheduleDate,...rest})}
				marginTop={top||1}
				width={'100%'}
			/>;
		  }}
	/>)
};

export default Home;
