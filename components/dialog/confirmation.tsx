import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

const ConfirmationModal = ({
	title,
	message,
	onConfirm,
	onConfirmText,
	onDismissText,
	visible,
	hasCancel,
	warnMassage,
	dismissable = true,
	onDismiss,
}: {
	title: string;
	message?: string;
	warnMassage?: string;
	dismissable?: boolean;
	onConfirmText?: string;
	onDismissText?: string;
	visible: boolean;
	hasCancel?: boolean;
	onDismiss: () => void;
	onConfirm: () => void;
}) => {
	return (
		<Portal>
			<Dialog visible={visible} dismissable={dismissable} onDismiss={onDismiss}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					{warnMassage && (
						<Paragraph style={styles.warnMassage}>{warnMassage}</Paragraph>
					)}
					{message && <Paragraph>{message}</Paragraph>}
				</Dialog.Content>
				<Dialog.Actions>
					{hasCancel && <Button onPress={onDismiss}>{onDismissText}</Button>}
					{onConfirmText && (
						<Button onPress={onConfirm}>{onConfirmText}</Button>
					)}
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
export default memo(ConfirmationModal);
const styles = StyleSheet.create({
	warnMassage: {
		color: 'red',
	},
});
