

import { useCallback, useEffect, useRef, useState } from 'react';
import { NestedObjToInfoString, appendText } from '../utils/renderText';
import GridView from '../components/GridView';
import { useSelector } from 'react-redux';
import { backArr, profileInfo, subStatus } from '../constants';
import { reorder } from '../utils/reorder';
import { useFocusEffect } from '@react-navigation/native';
import useNavOptions from '../hooks/useNavOptions';
import { isEmpty,omit,startCase } from "lodash";
import { useStore } from '../hooks/use-store';
import { DateTimeFormat } from '../utils/date-formatter';
import ConfirmationModal from '../components/dialog/confirmation';

const Info = ({ route: { params, name }, navigation }) => {
	const {
		info={},
		screenName = name,
		userId,
		categoryId,
		infoId,
		from,
	} = params || {};
	console.log('info status ',userId,' categoryId ',categoryId);
	const { user } = useSelector(({ login }) => login);
	const {categoryId:catId,userId:currentId}=user
	const initData=screenName==="Profile"&&!userId?user:info
	const [currentData, setCurrentData] = useState<any>({...initData,payload:[]});
	const [isSpinner, setSpinner] = useState<boolean>(isEmpty(initData));
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
		  setCurrentData((value:{})=>{
			return {...value,status}
		});
		  menuOpt()  
	}
	const menuOpt = useCallback((msg?: any) => {
		setmodalMsg(msg);
		setShowConfirmationModal(!!msg);
	}, []);
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
							scheduleDate:scheduleDate?`📅~${DateTimeFormat(scheduleDate)}~`:null,
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
					const payload= await queryDoc(`${screenName}/${infoId}`);
	
					data={...data,...payload,timestamp:payload?.timestamp.toString()}
				}
				const otherInfo=['Doctor','Registrar']
				for (let index = 0; index < otherInfo.length; index++) {
					const element = otherInfo[index];
					const currentId=data[`${element.toLowerCase()}Id`]
					if(currentId){
						const payload= await queryDoc(`${element}/${currentId}`);
						const {name,speciality}=payload
						entityRef.current.set(currentId,{...payload,userId:currentId,timestamp:timestamp.toString()})
	
						data={...data,[element]:appendText(['[',startCase(name),':',currentId,']']),speciality}
					}
				}
			}
			setCurrentData((value:{})=>{
				return {...value,...data}
			});
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
