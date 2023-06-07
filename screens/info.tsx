

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NestedObjToInfoString, appendText } from '../utils/renderText';
import GridView from '../components/GridView';
import { useDispatch, useSelector } from 'react-redux';
import * as Linking from 'expo-linking';

import { backArr, inputBasePayload, profileInfo, subStatus } from '../constants';
import { reorder } from '../utils/reorder';
import { useFocusEffect } from '@react-navigation/native';
import useNavOptions from '../hooks/useNavOptions';
import { isEmpty,omit,startCase } from "lodash";
import { useStore } from '../hooks/use-store';
import { DateTimeFormat } from '../utils/date-formatter';
import ConfirmationModal from '../components/dialog/confirmation';
import { customDateEqual } from '../utils/custom-compare';
import { setCurrentInfo } from '../data/redux/slices/entities';
import { useInputSheet } from '../hooks/useInputSheet';
import randomUUUID from '../utils/UUUID';

const Info = ({ route: { params, name }, navigation }) => {
	const {
		info={},
		screenName = name,
		userId,
		categoryId,
		infoId,
		from,
	} = params || {};
	const user  = useSelector(({ login }) => login.user,customDateEqual);
	const {Doctor, Registrar,userId:currentId}=user
	const catId=Doctor?'Doctor':Registrar?"Registrar":"Patient"
	console.log('info status ',userId,' categoryId ',categoryId,' catId ',catId);
	const currentInfo  = useSelector(({ entity }) => entity.currentInfo[screenName],customDateEqual);
	console.log('currentInfo ',currentInfo);
	const {openShareInput}=useInputSheet()

	const dispatch=useDispatch()
	const currentData=useMemo(()=>{
	    return screenName==="Profile"&&!userId?user:currentInfo
	},[currentInfo,user])
	//const [currentData, setCurrentData] = useState<any>({...initData,payload:[]});
	const [isSpinner, setSpinner] = useState<boolean>(screenName==="Profile"&&!userId);
	const { queryDoc,addModData } = useStore();
	const entityRef=useRef<any>(new Map())
	const [items, setTopItem] = useState<any>()
	const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
	const [modalMsg, setmodalMsg] = useState<any>();
	const noInfo=isEmpty(info)

	async function saveInfo() {
		const {flag,status}=modalMsg
		menuOpt({
			title: 'Proccessing',
			message: 'wait...',
			dismissable: false,
		})
		const compositeId=`${screenName.toLowerCase()}Id`
		const resId=currentData[compositeId]
		console.log('status ',status,' currentData ',currentData,' compositeId ',compositeId,' resId ',resId);
		
		await addModData(
			{status},
			resId,
			screenName
		  );
		  if(flag===3){
			const {amount,currency,patientId}=currentData

			await addModData(
				{
					amount,currency,
					details:screenName,
					[compositeId]:resId,
					patientId,
					timestamp:new Date()
				},
				'',
				'Payment'
			  );
		  }
		  dispatch(setCurrentInfo({[screenName]:{
			...currentData,
			status,
			updatedAt:new Date().getTime() 
		}}))
		  
		  menuOpt()  
	}
	const menuOpt = useCallback((msg?: any) => {
		setmodalMsg(msg);
		setShowConfirmationModal(!!msg);
	}, []);
	const onListClick = async ({value,value1}) => {
		const prescriptionId=randomUUUID()
		const {appointmentId,doctorId}=currentData

		await addModData(
			{
				prescriptionId,
				status:2
			},
			appointmentId,
			'Appointment'
		  );
		  await addModData(
			{
				prescriptionId,
				details:value,
				amount: Number(value1),
				currency:'ZMW',
				doctorId,
				status:1,
				timestamp:new Date()
			},
			prescriptionId,
			'Prescription'
		  );
	}
	const onClickFun = ({ index }) => {
		const {status,title,message,flag}=items.payload[index]
		if(screenName==='Profile'){
			navigation.navigate('Subs',{
				userId:userId||currentId,
				categoryId:categoryId||catId,
				screenName:title
			})
		}else{
			if(status===undefined){
				navigation.goBack()
			}else{
				if(flag===0||flag===3){
					const {amount,currency}=currentData

					menuOpt({
						title,
						message: flag===0?message:message.replace('$$$',`${currency} ${amount}`),
						onConfirmText: title,
						status,
						flag,
					})	
				}else if(flag===1){
					dispatch(setCurrentInfo({Appointment:{
						...currentData,
						currentDate:{
							timestamp: currentData.schedule,

						},
						updatedAt:new Date().getTime() 
					}}))
					navigation.navigate('Schedule',{title})
				}else if(flag===4){
					openShareInput({
						...inputBasePayload,
						title: 'Prescription',
						btnLabel:'prescribe',
						height:100,
						value: '',
						value1: '',
						label1:'Amount (ZMW)',
						require1:true,
						keyboardType1:'number',
						onListClick
					})
				}else if(flag===2){
					const {link}=currentData
					console.log('link ',link);
					
					Linking.openURL('https://expo.dev');
				}
			}
		}
	};
	const cardClick = (flag:number,id:string,col:string) => {
		if(flag===1){
			if(entityRef.current.has(id)){
				const {screenName,...info}=entityRef.current.get(id)
				navigation.push(
					'Info',
					{
						info,
						screenName:screenName||'Profile'
					}
				)
			}
		}else if(flag===3){
			
				navigation.push(
					'Info',
					{
						infoId:col,
						screenName:id,
						userId:currentData.patientId,
		                categoryId:'Patient',
					}
				)
			
		}else if(flag===2){
			const {userId,profileUrl}=currentData
			console.log('currentId ',currentId,' userId ',userId);
			navigation.navigate('ProStack', {
				screen: 'Boarding',
				params: { start: currentId===userId?0:1,imgUrl:profileUrl },
			});
		}
	};
	
	
	useFocusEffect(
		useCallback(() => {
			if(currentData){

				let  infoData;
				console.log('refresh ',currentData);
				const {
					name,
					email,
					gender,
					idNumber,
					categoryId,
					speciality,
					age=0,
					phone,
					userId,
					status,
					profileUrl
				} = currentData;
				infoData = {
					url:profileUrl,
					customStyle:screenName==='Profile'?{}:{
						height:'auto'
					},
					cardClick,
					info:!name?'Loading....':NestedObjToInfoString({ 
					name:screenName!=='Profile'?appendText(['[',startCase(name),':',userId,']']):startCase(name), 
					agender:`${gender} | ${age||''} | ${categoryId||''}| ${speciality||''}`, 
					idNumber,
					email,
					phone ,
				})}
				if (screenName !== 'Profile') {
					const {
						Doctor,
						speciality,
						details,
						Registrar,
						amount,
						currency,
						timestamp,
						scheduleDate,
						bookedDate,
						link,
						appointmentId,
						prescriptionId,
						id
					} = currentData;
					infoData = {
						...infoData,
						moreInfo:!id?null:NestedObjToInfoString({
							id:`~${id}~\n`,
							details,
							ref: screenName==='Appointment'?null:`{{${prescriptionId||appointmentId}:${screenName==='Payment'?details:'Appointment'}}}\n`,
							link,
							scheduleDate:scheduleDate?`📅~${DateTimeFormat(scheduleDate,'dd MMM yyyy')}~ `:null,
							time: scheduleDate?`\n${DateTimeFormat(scheduleDate,'HH:mm')}`:null,
							status:status!==undefined?'Status':null,
							statusVal:status!==undefined?subStatus[screenName].msg[status]:null,
							name:currency?`${currency}${amount}`:null,
							title:Doctor?'Specialist':null,
							Doctor,
							agender:speciality,
							label:Registrar?'Booked by':null,
							Registrar,
							bookedDate:bookedDate?DateTimeFormat(bookedDate):null,
							timestamp:timestamp?`\n🕒${DateTimeFormat(timestamp)}`:null,
							
						})
					}
				}
				let payload:any[]
				if (screenName === 'Profile') {
					if(categoryId!=='Registrar'){

						if (catId !== 'Doctor') {
							 payload=profileInfo;
						} else {
							 payload=reorder(profileInfo, 1, null, 1, true);
						}
					}else{
						payload=[]
					}
					console.log('infoData ',infoData);
				}else if(screenName === 'Payment'){
					payload=backArr
				}else{
					payload=subStatus[screenName][catId][status]
				}
				setTopItem({infoData,payload})
				setSpinner(false)
			}
		}, [screenName, currentData,catId,categoryId]),
	);

	
		useEffect(() => {
		(async()=>{
			let data={}
			if (userId) {
				
				const payload= await queryDoc(`${categoryId}/${userId}`);
				data={
					    ...data,
					    ...omit(payload,screenName!=='Profile'?['status','timestamp']:''),
						userId:payload[`${categoryId.toLowerCase()}Id`],
						
					}
				entityRef.current.set(userId,payload)
			}
			if(screenName!=='Profile'){
				if(noInfo){
					const payload:any= await queryDoc(`${screenName}/${infoId}`);
	
					data={...data,...payload}
				}
				const otherInfo=['Doctor','Registrar']
				for (let index = 0; index < otherInfo.length; index++) {
					const element = otherInfo[index];

					const currentId=currentData[`${element.toLowerCase()}Id`]
					
					if(currentId){
						const payload:any= await queryDoc(`${element}/${currentId}`);
						console.log('currentId payload ',currentId);

						const {name,speciality}=payload
						entityRef.current.set(currentId,{...payload,userId:currentId})
	
						data={...data,[element]:appendText(['[',startCase(name),':',currentId,']']),speciality}
					}
				}
			}
			dispatch(setCurrentInfo({[screenName]:{
				...currentData,
				...data,
				updatedAt:new Date().getTime() 
			}}))
			
		})()
	}, [userId, screenName,noInfo,infoId]);
	useNavOptions(
		navigation,
		from ? 30 : 0,
		null,
		null,
		screenName,
	);
	return <>
		{modalMsg && (
			<ConfirmationModal
				{ ...modalMsg }
				visible={showConfirmationModal}
				onConfirm={saveInfo}
			/>
		)}
		<GridView
			{...{
				profileInfo: items?.payload||[],
				onClickFun,
				isSpinner,
				header: screenName !== 'Profile'||categoryId==='Registrar'?null:'Records',
				itemBtns: screenName !== 'Profile',
				topItem:items?.infoData, 
				subName:'name',
				numColumns:2
			}}
		/>
	</> 
	
};

export default Info;
