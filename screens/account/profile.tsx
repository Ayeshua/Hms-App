import { useState, useMemo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import ConfirmationModal from '../../components/dialog/confirmation';
import { Dropdown } from 'react-native-element-dropdown';
import ErrorBox from '../../components/errorBox';
import { SEX } from '../../constants';
import { useMe } from '../../hooks/useMe';
import { screenStyles } from '../../styles';
import { RootState } from '../../data/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useStore } from '../../hooks/use-store';
import { omit, pick } from 'lodash';
import { setUser } from '../../data/redux/slices/login';
import useNavOptions from '../../hooks/useNavOptions';
import { colors } from '../../theme/colors';
import { useFunc } from '../../hooks/functions/useFunc';

const userFields=[
	'name',
	'email',
	'timestamp',
	'gender',	
				'status',
				'age',
			'idNumber'
]
const Profile = ({ navigation }) => {
	//const [files, setFiles] = useState<any>({});
	const [showConfirmationModal, setShowConfirmationModal] =
		useState<boolean>(false);
	const [modalMsg, setmodalMsg] = useState<any>();
	const dispatch = useDispatch();

	const { user } = useSelector((state: RootState) => state.login);
	const { _updateUser } = useMe();
	const { callFunc } = useFunc();

	const { addModData } = useStore();

	const menuOpt = (msg: any) => {
		setmodalMsg(msg);
		setShowConfirmationModal(!!msg);
	};

	const {
		name = '',
		email = '',
		gender ='',
		idNumber ='',
		categoryId ='',
		speciality='',
		userId,
		status,
		age=0,
		phone='',
	} = user;

	
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name,
			email,
			gender,
			age,
			phone,
			idNumber,
		categoryId,
		speciality,
		},
	});
	const saveUser = useCallback(async (payload: any) => {
		const date = new Date();
		console.log('payload ', payload);
		const statusVal = Math.max(2,status);
		if (status === 1) {

			await callFunc(
				{ email, payload:{status:statusVal} },
				'addCustom',
			);
		}
		await addModData(
			{
				...payload,
				status: statusVal,
				timestamp: date,
			},
			userId,
			categoryId,
			categoryId==='Patient'?userFields:categoryId==='Doctor'?[
			...userFields,
			'phone',	
			'speciality'
	  ]:[
		...userFields,
		'phone',	
  ]
		);
		dispatch(setUser({ ...payload, status: statusVal }));

		setShowConfirmationModal(false);
		if(statusVal===2){
			console.log('nav boarding');
			
			navigation.navigate('Boarding')
		}
	}, []);
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
			await _updateUser(pick(data, ['name']));
			const payload = {
				...user,
				...omit(data, 'password'),
				age: data.age?Number(data.age):0,
			};


			saveUser(payload);
		
		})();
	}, [_updateUser]);
	const icons = useMemo(() => {
		const arr = [
			{
				name: 'checkbox-outline',
				color: colors.primary,
				size: 23,
			},
		];
		return arr;
	}, []);
	useNavOptions(
		navigation,
		 30,
		icons,
		iconPress,
		status === 1 ? 'Create Profile' : 'Edit Profile',
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
					
						<View
							style={{
								marginBottom: 20,
							}}
						>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								name='gender'
								render={({ field: { onChange, value } }) => (
									<Dropdown
										placeholder={'gender'}
										style={screenStyles.dropdown}
										containerStyle={screenStyles.dropdownContainer}
										itemContainerStyle={screenStyles.dropdownItemContainer}
										onChange={(item) => {
											onChange(item.name);
										}}
										data={SEX}
										valueField='name'
										labelField='name'
										value={value}
									/>
								)}
							/>
							<ErrorBox field='gender' errors={errors.gender} />
						</View>
					
					<View style={{ marginBottom: 20 }}>
						<Controller
							name='name'
							rules={{
								required: true,
								minLength: 4,
							}}
							control={control}
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									label={'Name'}
									placeholder='Change Name'
									value={value}
									onChangeText={handleChange}
									textContentType='username'
								/>
							)}
						/>
						<ErrorBox field='name' errors={errors.name} />
					</View>
					<View style={{ marginBottom: 20 }}>
						<Controller
							name='age'
							rules={{
								required: false,
								maxLength: 2,
							}}
							control={control}
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									label={'age'}
									placeholder='Change age'
									value={value}
									onChangeText={handleChange}
									keyboardType='numeric'
									/>
							)}
						/>
						<ErrorBox field='age' errors={errors.age} />
					</View>
					<View style={{ marginBottom: 20 }}>
						<Controller
							name='idNumber'
							rules={{
								required: false,
							}}
							control={control}
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									label={'ID Number'}
									placeholder='Change ID Number'
									value={value}
									onChangeText={handleChange}
									keyboardType='numeric'
									/>
							)}
						/>
						<ErrorBox field='idNumber' errors={errors.idNumber} />
					</View>
					
				
					{categoryId!=='Patient' && (
						<>
							<View style={{ marginBottom: 20 }}>
								<Controller
									name='phone'
									rules={{
										required: true,
									}}
									control={control}
									render={({ field: { onChange: handleChange, value } }) => (
										<TextInput
											mode='outlined'
											label={'phone number'}
											placeholder='Change phone number'
											value={value}
											onChangeText={handleChange}
											textContentType='telephoneNumber'
										/>
									)}
								/>
								<ErrorBox field='phone' errors={errors.phone} />

							</View>
							{categoryId==='Doctor'&&<View style={{ marginBottom: 20 }}>
								<Controller
									name='speciality'
									rules={{
										required: true,
									}}
									control={control}
									render={({ field: { onChange: handleChange, value } }) => (
										<TextInput
											mode='outlined'
											label={'speciality'}
											placeholder='Change speciality'
											value={value}
											onChangeText={handleChange}
											textContentType='none'
										/>
									)}
								/>
								<ErrorBox field='speciality' errors={errors.speciality} />

							</View>}
							
						</>
					)}
					
				</View>
			</ScrollView>
		</View>
	);
};

export default Profile;
