import { useState, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { shallowEqual,  useSelector } from 'react-redux';
import { customDateEqual } from '../utils/custom-compare';
import { useStore } from '../hooks/use-store';
import useNavOptions from '../hooks/useNavOptions';
import { colors } from '../theme/colors';
import ConfirmationModal from '../components/dialog/confirmation';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ErrorBox from '../components/errorBox';
import { DateTimeFormat } from '../utils/date-formatter';
import '../components/ActionSheets/flat-sheet';
import { SheetManager } from 'react-native-actions-sheet';
import { 
	getDate, 
	getHours, 
	getMilliseconds, 
	getMinutes, 
	getMonth,
	 getSeconds,
	 getTime, 
	getYear 
} from 'date-fns';

const icons = [
	{
		name: 'checkbox-outline',
		color: colors.primary,
		size: 23,
	},
];
const Schedule = ({ navigation,route:{params:{title,currentData}} }) => {
	//const [files, setFiles] = useState<any>({});
	const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
	const [modalMsg, setmodalMsg] = useState<any>();
	const [timing, settiming] = useState<any>();
	//const dispatch = useDispatch();
	const {Registrar,userId,name}  = useSelector(({ login:{user:{
		Registrar,
		userId,
		name
	} }}) => {
		return {Registrar,userId,name}
	},shallowEqual);

	//const currentData  = useSelector(({ entity }) => entity.currentInfo.Appointment,customDateEqual);
	const {arr:doctors}  = useSelector(({ entity }) => entity.Doctors,customDateEqual);


	const { addModData } = useStore();

	const menuOpt = (msg: any) => {
		setmodalMsg(msg);
		setShowConfirmationModal(!!msg);
	};

	const {
		doctor = {},
		link = '',
		currentDate:{timestamp=getTime(new Date())},
		appointmentId,
	} = currentData;

	
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			doctor ,
		link ,
		currentDate:{
			timestamp,
			date:DateTimeFormat(timestamp,'dd MMM yyyy')
		} ,
		time: {
			timestamp,
			val: DateTimeFormat(timestamp,'HH:mm')
		} 
		},
	});
	const onClosePicker=(timestamp:number)=>{
		
		if(timestamp){
			if(timing.mode==='date'){

				setValue('currentDate',{
					date:DateTimeFormat(timestamp,'dd MMM yyyy'),
					timestamp
				}) 
			}else{
				setValue('time',{
					val: DateTimeFormat(timestamp,'HH:mm'),
					timestamp
				}) 
			}

		}
	}
	const openDocList=async()=>{
		console.log('show list ',doctors);
		
		const {item}= (await SheetManager.show('flatlist-sheet', {
			payload: {
				profileInfo: doctors,
				snapPoints: [100],
			},
		})||{})as any;
		if (item) {
			setValue('doctor',item)
		}
	}
	const iconPress = useCallback(() => {
		handleSubmit(async (data) => {
			// TODO*: add dispatcher for user data
			// dispatch(addMeter({ ...data, id: 4534 }));
			// () => {
			menuOpt({
				title: 'Saving',
				message: 'wait...',
				dismissable: false,
			});
			const {doctor:{id, speciality,name:docName},currentDate:{timestamp},time:{timestamp:timer},link}=data
			const scheduleDate= getTime(new Date(
				getYear(timestamp),
				getMonth(timestamp),
				getDate(timestamp),
				getHours(timer),
				getMinutes(timer),
				getSeconds(timer),
				getMilliseconds(timer)
				))
			let updateData:any={
				link,
				doctorId:id,
				scheduleDate,
				status:2	
			}
			if(Registrar){
				updateData={
					...updateData,
					registrarId:userId,
					bookedDate: new Date()
				}
			}
			await addModData(
				{...updateData,scheduleDate:new Date(scheduleDate)},
				appointmentId,
				'Appointment'
			  );
		
			setShowConfirmationModal(false);
			/* dispatch(setCurrentInfo({Appointment:{
				...currentData,
				...updateData,
				Doctor:appendText(['[',startCase(docName),':',id,']']),
				Registrar:Registrar?appendText(['[',startCase(name),':',userId,']']):null,
				speciality,
				bookedDate: new Date().getTime(),

				updatedAt:new Date().getTime() 
			}})) */
			navigation.goBack()
		})();
	}, [addModData]);
	
		
	useNavOptions(
		navigation,
		 30,
		icons,
		iconPress,
		title,
	);
	
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			{modalMsg && (
				<ConfirmationModal
					{...modalMsg}
					visible={showConfirmationModal}
					onDismiss={() => menuOpt(null)}
				/>
			)}
			<ScrollView>
				<View
					style={{
						marginTop: 30,
						width: '70%',
						alignSelf: 'center',
					}}
				>
					{timing?.show&&<DateTimePicker 
					value={new Date(watch('currentDate').timestamp)}
					 mode={timing.mode} 
					 is24Hour
					 onChange={(event: DateTimePickerEvent, date: Date) => {
						console.log('date ',date);
						
						settiming({show:false})
						Keyboard.dismiss()
						const {
							type,
							nativeEvent: {timestamp},
						} = event;
						if(type==='set'){
							onClosePicker(timestamp)
						}

					}} />}
					
					<View style={{ marginBottom: 20 }}>
						<Controller
							name='doctor'
							rules={{
								required: true,
							}}
							control={control}
							render={({ field: { value } }) => (
								<TextInput
									mode='outlined'
									label={'doctor'}
									placeholder='Select doctor'
									value={value?.name}
									disabled={title==='Reschedule'}
									editable={false}
									
									right={<TextInput.Icon
										name={'doctor'}
										size={24}
										onPress={()=>{
											
											if(title!=='Reschedule')openDocList()
										}}
									/>}
									textContentType='username'
								/>
							)}
						/>
						<ErrorBox field='doctor' errors={errors.doctor} />
					</View>
					<View style={{ marginBottom: 20 }}>
						<Controller
							name='currentDate'
							rules={{
								required: true,
								minLength: 4,
							}}
							control={control}
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									label={'Date'}
									placeholder='Change Date'
									value={value.date}
									onChangeText={handleChange}
									editable={false}
									right={<TextInput.Icon
										name={'calendar'}
										size={24}
										onPress={()=>settiming({mode:'date',show:true})}
									/>}
									textContentType='username'
								/>
							)}
						/>
						<ErrorBox field='currentDate' errors={errors.currentDate} />
					</View>
					<View style={{ marginBottom: 20 }}>
						<Controller
							name='time'
							rules={{
								required: true,
								minLength: 4,
							}}
							control={control}
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									label={'Time'}
									placeholder='Change Date'
									value={value.val}
									onChangeText={handleChange}
									editable={false}
									right={<TextInput.Icon
										name={'clock-time-two-outline'}
										size={24}
										onPress={()=>settiming({mode:'time',show:true})}

									/>}
									textContentType='username'
								/>
							)}
						/>
						<ErrorBox field='time' errors={errors.time} />
					</View>
					<View style={{ marginBottom: 20 }}>
						<Controller
							name='link'
							rules={{
								required: true,
							}}
							control={control}
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									label={'Link'}
									placeholder='Change link'
									value={value}
									onChangeText={handleChange}
									keyboardType='url'
									/>
							)}
						/>
						<ErrorBox field='link' errors={errors.link} />
					</View>
					
				</View>
			</ScrollView>
		</View>
	);
};

export default Schedule;
