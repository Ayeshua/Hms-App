import React, { memo } from 'react';
import { FieldError } from 'react-hook-form';
import { HelperText } from 'react-native-paper';

type ErrorBoxType = {
	length?: number;
	field: string;
	isVisible?: boolean;
	errors?: FieldError | undefined;
	type?: 'normal' | 'required ' | 'length' | 'pattern';
};
const ErrorBox = ({ errors, length, isVisible, field, type }: ErrorBoxType) => {
	return (
		<>
			{errors?.type == 'required' && (
				<HelperText type='error' visible={errors?.type == 'required'}>
					{field} is required!.
				</HelperText>
			)}
			{errors?.type == 'minLength' && (
				<HelperText type='error' visible={errors?.type == 'minLength'}>
					{field} should be a min of {length} characters long.
				</HelperText>
			)}
			{type === 'normal' && (
				<HelperText type='error' visible={isVisible}>
					{field}
				</HelperText>
			)}
		</>
	);
};
export default memo(ErrorBox);
