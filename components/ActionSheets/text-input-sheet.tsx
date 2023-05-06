import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import ActionSheet from 'react-native-actions-sheet';
import { Button, TextInput, Title } from 'react-native-paper';
import { screenStyles } from '../../styles';
import ErrorBox from '../errorBox';

const TextInputSheet = ({
	sheetId,
	payload: { onListClick, txt, title, snapPoints, btnLabel, leftBtnLabel },
}) => {
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			adminComment: txt,
		},
	});
	return (
		<ActionSheet
			{...{ snapPoints }}
			id={sheetId}
			containerStyle={{
				borderTopLeftRadius: 25,
				borderTopRightRadius: 25,
			}}
			indicatorStyle={{
				width: 100,
			}}
			gestureEnabled
			//ref={actionSheetRef}
		>
			<Title
				style={{
					paddingLeft: 16,
				}}
			>
				{title}
			</Title>
			<View
				style={{
					padding: 16,

					width: '100%',
				}}
			>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name={'adminComment'}
					render={({ field: { value } }) => (
						<TextInput
							mode='outlined'
							label={'admin comment'}
							placeholder={'admin comment'}
							style={{ ...screenStyles.input, height: 130 }}
							value={value}
						/>
					)}
				/>
				<ErrorBox field='adminComment' errors={errors.adminComment} />
			</View>

			<View
				style={{
					display: 'flex',
					paddingHorizontal: 16,
					paddingBottom: 16,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Button mode='outlined' onPress={() => {}}>
					{leftBtnLabel}
				</Button>
				<Button
					mode='contained'
					onPress={handleSubmit((data) => {})}
					textColor='#fff'
				>
					{btnLabel}
				</Button>
			</View>
		</ActionSheet>
	);
};

export default memo(TextInputSheet);
