import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../data/redux/store';
import { useStore } from '../hooks/use-store';
import AvatarIcon from '../components/avatar-icon';
import ErrorBox from '../components/errorBox';
import { screenStyles } from '../styles';
import randomUUUID from '../utils/UUUID';
import ConfirmationModal from '../components/dialog/confirmation';
import { omit } from "lodash";

const payInfo={amount:100,currency:'ZMW'}

export const NewAppointment = ({ navigation}) => {
	
  const {
		user,
	} = useSelector((state: RootState) => state.login);
	const [isSaving, setSaving] = useState<boolean>(false);
	const appointmentRef=useRef<any>()
	const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
	const [modalMsg, setmodalMsg] = useState<any>();
    const { addModData } = useStore();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			details: '',
		},
	});
	
	async function saveInfo({details}: { details: string; }) {
		setSaving(true)
		const appointmentId=randomUUUID()
		appointmentRef.current={
			...payInfo,
			details,
			appointmentId,
			status:0,
			patientId:user.userId,
		  timestamp: new Date(),
		}
		await addModData(
			appointmentRef.current,
			appointmentId,
			'Appointment'
		  );
		  setSaving(false)
		  const title='Pay Now'
			setmodalMsg({
				title,
				message: `Pay consultation fee of k100 to book an appointment`,
				onConfirmText: title,
				onDismissText: 'Later',
				hasCancel:true
			})
			setShowConfirmationModal(true);
	}
	async function savePayment() {
		setmodalMsg({
			title: 'Proccessing',
			message: 'wait...',
			dismissable: false,
		})
		appointmentRef.current={...appointmentRef.current,status:1}
		const {appointmentId,patientId}=appointmentRef.current
		const details='Appointment'
		await addModData(
			appointmentRef.current,
			appointmentId,
			details
		  );
		await addModData(
			{
				...payInfo,
				details,
				appointmentId,
				patientId,
				timestamp:new Date()
			},
			'',
			'Payment'
		  );
		  navToInfo()
	}
	const navToInfo=()=>{
		setShowConfirmationModal(false);
		const {timestamp,appointmentId}=appointmentRef.current
		navigation.navigate('Info',{
			info:{
				...appointmentRef.current,
				...omit(user,'status'),
				id:appointmentId,
				timestamp:timestamp.toString()
			},
			screenName:'Appointment'
		})
	}
	return (
			<View style={styles.mainContainer}>
				{modalMsg && (
				<ConfirmationModal
					{ ...modalMsg }
					visible={showConfirmationModal}
					onConfirm={savePayment}
					onDismiss={navToInfo}
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
					<AvatarIcon name='emoticon-sick-outline' />
					<View>
						<Text style={{
									marginBottom: 20,
								}} variant='labelLarge'>{'Tell us how you feeling.'}</Text>
						<View>
							<View
								style={{
									marginBottom: 20,
								}}
							>
								<Controller
									control={control}
									rules={{
										required: true,
										minLength:4
									}}
									render={({ field: { onChange:handleChange, value } }) => (
										<TextInput
											mode='outlined'
											label={'How are you feeling?'}
											placeholder='How are you feeling?'
											style={{ ...screenStyles.input, height:100 }}
											onChangeText={handleChange}
											multiline
											value={value}
											
											clearButtonMode='always'
											//textContentType='u'
										/>
									)}
									name='details'
								/>
								<ErrorBox field='details' errors={errors.details} />
							</View>
							
						</View>
						<Button
								mode='contained'
								onPress={handleSubmit(({details}) => saveInfo({details}))}
								loading={isSaving}
								disabled={isSaving}
								textColor='#fff'
							>
								{'Proceed'}
							</Button>
					</View>
          
          </View>
          </ScrollView>
			</View>
			
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1, backgroundColor: '#fff'
	},

	inputContainerDesktop: {
		marginLeft: '30%',
	},
	input: {
		color: '#000',
		backgroundColor: 'white',
		marginBottom: 4,
	},
	title: {
		paddingTop: 10,
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: 20,
		alignSelf: 'center',
		color: 'black',
	},
	titleDesktop: {
		paddingTop: 10,
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: 20,

		color: 'black',
	},
	errorText: {
		color: 'red',
	},
});
