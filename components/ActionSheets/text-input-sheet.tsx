import { memo, useLayoutEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Button, Paragraph, Text, TextInput, Title } from 'react-native-paper';
import { screenStyles } from '../../styles';
import ErrorBox from '../errorBox';
import { colors } from '../../theme/colors';
import { Dropdown } from 'react-native-element-dropdown';

const TextInputSheet = ({
	sheetId,
	payload: { 
		onListClick,
		title,
		message, 
		snapPoints, 
		selectData,
		btnLabel, 
		leftBtnLabel='Close',
		value,
		value1,
		value2,
		editable1=true,
		editable2=true,
		customTokens,
		tokens,
		pattern1,
		required1,
		pattern2,
		required2,
		pattern,
		label,
		label1,
		visible,
		height,
		keyboardType,
		keyboardType1,
		required,
		flag,
		status,
		closable=true
	},
}) => {
	const ref=useRef<TextInput>()
	const [loading, setLoading] = useState<any>();

	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			value,
			value1,
			value2,
			customTokens,
			doctor:selectData?selectData[0]:null,
		},
	});
	
	console.log('errors ', errors);
	useLayoutEffect(() => {
		console.log('start ');
		
			setTimeout( ()=> {
				//element.innerHTML += "Hello"
				ref.current?.focus()
			}, 1000);
		
	}, [])
	return (
		<ActionSheet
			{...{ snapPoints,closable }}
			id={sheetId}
			containerStyle={{
				borderTopLeftRadius: 25,
				borderTopRightRadius: 25,
				padding: 16,
			}}
			
			indicatorStyle={{
				width: 100,
			}}
			gestureEnabled
		>
			<Title
				
			>
				{title}
			</Title>
			{message && <Paragraph>{message}</Paragraph>}

			{selectData!==undefined&&<View
						style={{
							marginBottom: 20,
						}}
					>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							name='doctor'
							render={({ field: { onChange, value } }) => (
								<Dropdown
									placeholder={'doctor'}
									style={screenStyles.dropdown}
									containerStyle={screenStyles.dropdownContainer}
									itemContainerStyle={screenStyles.dropdownItemContainer}
									onChange={(item) => {
										onChange(item);
									}}
									data={selectData}
									valueField='name'
									labelField='name'
									value={value}
								/>
							)}
						/>
						<ErrorBox field='doctor' errors={errors.doctor} />
					</View>}
			{value!==undefined&&<View style={{ marginBottom: 20 }}>
						<Controller
							name='value'
							rules={{
								required,
								pattern:pattern?new RegExp(pattern):undefined

							}}
							control={control}
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									ref={ref}
									mode='outlined'
									placeholder={label}
									style={{ ...screenStyles.input, height }}
									onChangeText={handleChange}
									editable={editable1}
									{...(!editable1&&{ right: <TextInput.Icon
										onPress={() => {
											
										}}
										color={colors.primary}
										icon='calendar'
									/> })}
									multiline
									{...{value,keyboardType,label}}
								/>
							)}
						/>
						<ErrorBox field='value' errors={errors.value} />
					</View>}
					{value1!==undefined&&<View style={{ marginBottom: 20 }}>
						<Controller
							name='value1'
							rules={{
								required:required1,
								pattern:pattern1?new RegExp(pattern1):undefined

							}}
							control={control}
							
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									placeholder={label1}
									label={label1}
									style={screenStyles.input}
									onChangeText={handleChange}
									editable={editable2}
									{...(!editable2&&{ right: <TextInput.Icon
										onPress={() => {
											
										}}
										color={colors.primary}
										icon='calendar-clock-outline'
									/> })}
									multiline
									{...{value,keyboardType:keyboardType1}}

								/>
							)}
						/>
						<ErrorBox field='value1' errors={errors.value1} />
					</View>}
					{value2!==undefined&&<View style={{ marginBottom: 20 }}>
						<Controller
							name='value2'
							rules={{
								required:required2,
								pattern:pattern2?new RegExp(pattern2):undefined

							}}
							control={control}
							
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									placeholder={label1}
									label={label1}
									style={screenStyles.input }
									onChangeText={handleChange}
									multiline
									{...{value,keyboardType:keyboardType1}}

								/>
							)}
						/>
						<ErrorBox field='value2' errors={errors.value2} />
					</View>}
					
					{tokens&&tokens.map((txt)=>(
						<View
							key={txt}
							style={{
								flexDirection: 'row',
								alignContent: 'center',
								marginBottom: 20,
							}}
						>
							<Pressable
								// icon='eye'
								style={{
									borderColor: colors.primary,
									borderWidth: 1,
									padding: 3,
									marginRight: 5,
									borderRadius: 3,
								}}
								onPress={() => {
									const val = watch('customTokens') 
									console.log('txt ',txt,' val ',val);
									
									setValue(`customTokens`,{ ...val,[txt]: !val[txt]} );
								}}
							>
								<View
									style={{
										backgroundColor: watch('customTokens')[txt] 
											? colors.primary
											: undefined,
										borderRadius: 3,

										width: 16,
										height: 16,
									}}
								/>
							</Pressable>
							<Text
								onPress={() => {
									const val = watch('customTokens') 
									console.log('txt ',txt,' val ',val);
									
									setValue(`customTokens`,{ ...val,[txt]: !val[txt]} );
								}}
								style={{
									color: colors.primary,
									alignSelf: 'center',
									fontSize: 16,
								}}
							>
								{txt}
							</Text>
						</View>
						))
					}

			<View
				style={{
					display: 'flex',
					paddingBottom: 16,
					marginTop:10,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				{leftBtnLabel&&<Button
				 mode='outlined' 
				 disabled={!!loading}
				 loading={loading===leftBtnLabel}

				 onPress={() => {
					if (flag) {
						if(visible) setLoading(leftBtnLabel)

						handleSubmit((data) => onListClick(data,title,flag))();
					} else {
						SheetManager.hide(sheetId);
					}
				}}>
					{leftBtnLabel}
				</Button>}
				{btnLabel&&<Button
					mode='contained'
					disabled={!!loading}
					loading={loading===btnLabel}

					onPress={handleSubmit((data) => {
						if(visible) setLoading(btnLabel)
						onListClick({...data,status},title)

					})}
					textColor='#fff'
				>
					{btnLabel}
				</Button>}
			</View>
		</ActionSheet>
	);
};

export default memo(TextInputSheet);
