import React, { memo } from 'react';
import {
	Button,
	Dialog,
	Paragraph,
	Portal,
	TextInput,
} from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import ErrorBox from '../../components/errorBox';

import { screenStyles } from '../../styles';

const InputModal = ({
	title,
	message,
	value,
	label,
	onConfirm,
	onConfirmText,
	onDismissText,
	visible,
	onDismiss,
	height,
	keyboardType,
	required,
	flag,
}: {
	title: string;
	message?: string;
	value?: string;
	label?: string;
	keyboardType?: string;
	onConfirmText?: string;
	onDismissText?: string;
	visible: boolean;
	onDismiss: () => void;
	onConfirm: (value: string) => void;
	height: number;
	required?: boolean;
	flag?: boolean;
}) => {
	console.log('value ', value);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			value,
		},
	});

	return (
		<Portal>
			<Dialog {...{ visible, onDismiss }}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					{message && <Paragraph>{message}</Paragraph>}
					<View style={{ marginBottom: 20 }}>
						<Controller
							name='value'
							rules={{
								required,
							}}
							control={control}
							render={({ field: { onChange: handleChange, value } }) => (
								<TextInput
									mode='outlined'
									placeholder={label}
									style={{ ...screenStyles.input, height }}
									onChangeText={handleChange}
									multiline
									value={value}
									keyboardType={keyboardType}
								/>
							)}
						/>
						<ErrorBox field='value' errors={errors.value} />
					</View>
				</Dialog.Content>
				<Dialog.Actions>
					{onDismissText ? (
						<Button
							onPress={() => {
								if (flag) {
									handleSubmit(({ value }) => onConfirm(value, flag))();
								} else {
									onDismiss();
								}
							}}
						>
							{onDismissText || 'Cancel'}
						</Button>
					) : null}
					<Button onPress={handleSubmit(({ value }) => onConfirm(value))}>
						{onConfirmText || 'Done'}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
export default memo(InputModal);
