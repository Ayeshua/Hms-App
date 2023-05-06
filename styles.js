import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme/colors';

export const screenStyles = StyleSheet.create({
	mainContainer: {
		height: '100%',
		marginHorizontal: '5%',
		marginTop: Platform.OS === 'web' ? '10%' : undefined,
		display: 'flex',
		flexDirection: 'column',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	'row-reverse': {
		flex: 1,
		display: 'flex',
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
	},
	center: {
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
	},
	'column-reverse': {
		display: 'flex',
		flexDirection: 'column-reverse',
	},
	text: {
		color: 'black',
		fontSize: 15,
	},
	text10: {
		color: 'gray',
		fontSize: 10,
	},
	txtGray: {
		color: colors.silver,
	},
	txtGreen: {
		color: colors.green,
	},
	txtOrange: {
		color: colors.ORANGE,
	},
	heading: {
		fontSize: 38,
		fontWeight: '900',
		textTransform: 'uppercase',
		letterSpacing: -2,
		textAlign: 'center',
	},
	centerTxt: {
		textAlign: 'center',
	},
	txtBlue: {
		color: colors.blue,
	},
	bold: {
		fontWeight: 'bold',
	},
	header: {
		fontWeight: '700',
		color: colors.primary,
	},
	textArea: {
		height: 100,
	},
	dropdown: {
		borderColor: '#000',
		borderWidth: 1,
		paddingVertical: 5,
		borderRadius: 4,
		paddingHorizontal: 10,
	},
	dropdownContainer: {
		borderColor: '#000',
		borderWidth: 1,
		borderRadius: 4,
	},
	border: {
		borderColor: colors.coolGray2,
		borderWidth: 1,
	},
	borderSel: {
		borderColor: colors.primary,
		borderWidth: 3,
	},
	dropdownItemContainer: {
		borderTopWidth: 1,
		borderColor: 'lightgrey',
		borderRadius: 4,
	},
	keyboardAvoidingContainer: {
		width: '75%',
		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'center',
	},
	keyboardAvoidingContainerDesktop: {
		width: '40%',
		display: 'flex',
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
	},
	inputContainerDesktop: {
		marginLeft: '30%',
	},
	input: {
		color: '#000',
		backgroundColor: 'white',
		//marginBottom: 4,
	},
	title: {
		paddingTop: 10,
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: '20%',
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
	p_5_10: {
		paddingTop: 0,
		paddingHorizontal: 10,
	},
	p_10: {
		padding: 10,
	},
	p_5: {
		padding: 5,
	},
	mt_10: {
		marginTop: 10,
	},
	ml_10: {
		marginLeft: 10,
	},
	mr_10: {
		marginLeft: 10,
	},
	m_5: {
		margin: 5,
	},
	buttonContainer: {
		marginBottom: 60,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	checkboxContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
});
