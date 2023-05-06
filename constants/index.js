import { colors } from '../theme/colors';
import { reorder } from '../utils/reorder';
import randomUUUID from '../utils/UUUID';

export const LINK_URL = 'https://hospital-management-syst-996a1.web.app';
export const DLINK_URL = 'https://hmsappzambia.page.link';
export const LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/hospital-management-syst-996a1.appspot.com/o/hms.png?alt=media&token=21deff3e-9238-4fe1-8d23-beb84da1d143';

export const CATEGORY = [
	{ name: 'Creative Arts', label: 'Creative Arts' },
	{ name: 'News', label: 'News' },
	{ name: 'Events', label: 'Events' },
	{ name: 'Projects', label: 'Projects' },
];
export const SEX = [
	{ name: 'Female', label: 'Female' },
	{ name: 'Male', label: 'Male' },
	{ name: 'Other', label: 'Other' },
];

export const addIcons = [
	{
		name: 'image',
		color: 'black',
		size: 24,
	},
	{
		name: 'video-vintage',
		color: 'black',
		size: 24,
	},
	{
		name: 'camera',
		color: 'black',
		size: 24,
	},
];
export const TEACHER_CATEGORY = [
	{ name: 'Early Childhood', label: 'Early Childhood' },
	{ name: 'Primary', label: 'Primary' },
	{ name: 'Secondary', label: 'Secondary' },
];
const payload = {
	type: 0,
	direction: 'row',
	innerDirection: 'column',
	justifyContent: 'flex-start',
};

export const input = {
	outlineColor: colors.coolGray2,
	value: 'placeholder',
	variant: 'bodyMedium',
	color: 'black',
	numLines: 1,
	pos: 1,
	bg: 'white',
	enableEdit: true,
};
export const title = {
	...input,
	variant: 'titleMedium',
	value: 'Title',

	pos: 0,
};
export const stringVariantStyles = {
	labelSmall: 'font-weight: 100; font-size: 9px;',
	labelMedium: 'font-weight: 500; font-size: 14px;',
	labelLarge: 'font-weight: 600; font-size: 15px;',
	bodySmall: 'font-weight: 200; font-size: 10px;',
	bodyMedium: 'font-weight: 400; font-size: 15px;',
	bodyLarge: 'font-weight: 700; font-size: 16px;',
	titleSmall: 'font-weight: 300; font-size: 11px;',
	titleMedium: 'font-weight: 700; font-size: 16px;',
	titleLarge: 'font-weight: 800; font-size: 18px;',
	headlineSmall: 'font-weight: 400; font-size: 12px;',
	headlineMedium: 'font-weight: 800; font-size: 17px;',
	headlineLarge: 'font-weight: 900; font-size: 24px;',
	displaySmall: 'font-weight: 500; font-size: 13px;',
	displayMedium: 'font-weight: 900; font-size: 18px;',
	displayLarge: 'font-weight: 900; font-size: 32px;',
};
const textVariant = [
	{ value: 'labelSmall', label: 'Label Small' },
	{ value: 'labelMedium', label: 'Label Medium' },
	{ value: 'labelLarge', label: 'Label Large' },
	{ value: 'bodySmall', label: 'Body Small' },
	{ value: 'bodyMedium', label: 'Body Medium' },
	{ value: 'bodyLarge', label: 'Body Large' },
	{ value: 'titleSmall', label: 'Title Small' },
	{ value: 'titleMedium', label: 'Title Medium' },
	{ value: 'titleLarge', label: 'Title Large' },
	{ value: 'headlineSmall', label: 'Headline Small' },
	{ value: 'headlineMedium', label: 'Headline Medium' },
	{ value: 'headlineLarge', label: 'Headline Large' },
	{ value: 'displaySmall', label: 'Display Small' },
	{ value: 'displayMedium', label: 'Display Medium' },
	{ value: 'displayLarge', label: 'Display Large' },
];
const colorArr = Object.entries(colors).map((entry) => {
	const [key, value] = entry;
	return { label: key, value };
});
export const profileImages = [
	{ value: 'profileUrl', title: 'Profile Pic' },
];
const optVH = [
	{ value: 'row', label: 'Title Left' },
	{ value: 'column', label: 'Title Top' },
];
const allVH = [
	{ value: 'column', label: 'Text Top' },
	{ value: 'column-reverse', label: 'Text Bottom' },
	{ value: 'row', label: 'Text Left' },
	{ value: 'row-reverse', label: 'Text Right' },
];
const alignH = {
	icon: 'align-horizontal-distribute',
	pos: 0,
	opt: [
		{ value: 'flex-start', label: 'Left' },
		{ value: 'center', label: 'Center' },
		{ value: 'flex-end', label: 'Right' },
	],
	field: 'justifyContent',
	label: 'Horizontal Align',
};
const arrowAll = {
	icon: 'arrow-all',
	pos: 1,
	opt: optVH,
	field: 'direction',
	label: 'Horizontal Vertical Align',
};
const arrowDir = {
	icon: 'arrow-decision-auto',
	pos: 2,
	opt: allVH,
	field: 'innerDirection',
	label: 'Align Elements',
};
const titleSize = {
	icon: 'format-text',
	pos: 3,
	field: 'variant',
	opt: textVariant,
	nest: 'title',
	label: 'Title Size',
};
const paraSize = {
	icon: 'format-color-text',
	pos: 4,
	nest: 'input',
	field: 'variant',
	opt: textVariant,
	label: 'Text Size',
};
const palette = {
	icon: 'palette-outline',
	pos: 5,
	nest: 'title',
	opt: colorArr,
	field: 'color',
	label: 'Title Color',
};
const paletteText = {
	icon: 'format-color-fill',
	pos: 6,
	nest: 'input',
	opt: colorArr,
	field: 'color',
	label: 'Text Color',
};
const imageSize = {
	icon: 'image-size-select-large',
	pos: 7,
	field: 'size',
	nest: 'image',
	label: 'Resize Image',
	message: 'Enter image size',
};
const rowUp = {
	icon: 'elevator-up',
	pos: 8,
	flag: 0,
	dLim: 'rows',
	indexed: 'row',
	val: false,
	field: 'justifyContent',
	label: 'Row Up',
	dVal: 1,
};
const rowDown = {
	icon: 'elevator-down',
	pos: 9,
	flag: 0,
	dLim: 'rows',
	indexed: 'row',
	val: true,
	field: 'justifyContent',
	label: 'Row Down',
};
const colRight = {
	icon: 'elevator-up',
	pos: 10,
	rotate: '90deg',
	dLim: 'colWidth',
	indexed: 'col',
	val: true,
	field: 'justifyContent',
	label: 'Column Right',
};
const colLeft = {
	icon: 'elevator-down',
	pos: 11,
	rotate: '90deg',
	dLim: 'colWidth',
	indexed: 'col',
	val: false,
	field: 'justifyContent',
	label: 'Column Left',
};
const addCol = {
	icon: 'table-column-plus-after',
	pos: 12,
	field: 'justifyContent',
	label: 'Add Column',
};
const subCol = {
	icon: 'table-column-remove',
	pos: 13,
	minSize: 'colWidth',
	val: 1,

	field: 'justifyContent',
	label: 'Remove Column',
};
const addRow = {
	icon: 'table-row-plus-after',
	pos: 14,
	field: 'justifyContent',
	label: 'Add Row',
};
const subRow = {
	icon: 'table-row-remove',
	pos: 15,
	flag: 0,
	minSize: 'rows',
	val: 0,
	field: 'justifyContent',
	label: 'Remove Row',
};

const tableBorder = {
	icon: 'border-all',
	pos: 16,
	opt: colorArr,
	field: 'tableBorder',
	label: 'Table Border Color',
};
const coverBorder = {
	...tableBorder,
	icon: 'square-circle',
	label: 'Cover Border Color',
};
const tableColumnWidth = {
	icon: 'table-column-width',
	pos: 17,
	field: 'colWidth',
	label: 'Column Width',
};
export const insert = {
	icon: 'import',
	pos: 18,
	flag: 0,
	opt: elements,
	field: 'label',
	label: 'Insert',
};
const noBorder = {
	icon: 'square-off-outline',
	pos: 19,
	opt: colorArr,
	field: 'tableBorder',
	label: 'No Border',
};
const delSub = {
	icon: 'delete-forever-outline',
	pos: 20,
	field: 'tableBorder',
	label: 'Delete Selected',
};
const cloneRow = {
	icon: 'table-arrow-down',
	pos: 21,
	field: 'colWidth',
	label: 'Clone Row',
};
const cloneColumn = {
	icon: 'table-arrow-right',
	pos: 22,
	field: 'colWidth',
	label: 'Clone Column',
};
export const cloneCell = {
	icon: 'content-copy',
	pos: 23,
	field: 'colWidth',
	label: 'Clone Cell',
};
const tableTools = [
	tableColumnWidth,
	cloneColumn,
	addCol,
	subCol,
	cloneRow,
	addRow,
	subRow,
	rowUp,
	rowDown,
	colRight,
	colLeft,
];
export const tools = {
	title: [alignH, titleSize, palette],
	'label-input': [arrowAll, titleSize, paraSize, palette, paletteText],
	image: [alignH, imageSize],
	'image-text': [alignH, imageSize, paraSize, arrowDir, paletteText],
	date: [paraSize, paletteText],
	text: [paraSize, paletteText],
	table: [tableBorder, ...tableTools],
	grid: reorder(tableTools, 7, { ...rowUp, dVal: 0 }),
	cover: [coverBorder, noBorder, rowUp, rowDown, delSub],
};

export const tempTitle = {
	icon: 'format-title',
	payload: { ...payload, title },
	label: 'title',
};
export const tempTxt = {
	icon: 'alphabet-latin',
	payload: { ...payload, input },
	label: 'text',
};
export const url =
	'https://firebasestorage.googleapis.com/v0/b/zeropen-d4946.appspot.com/o/placeholder.jpg?alt=media&token=22835c2a-0926-4056-b2fb-ede151dce252';
const elements = [
	tempTitle,
	{
		icon: 'label-outline',
		label: 'label-input',
		payload: { ...payload, input, title },
	},
	{
		icon: 'image-area',
		payload: {
			...payload,
			image: {
				...input,
				pos: 3,
				size: 100,
				value: 'image',
				url,
			},
		},
		label: 'image',
	},

	{
		icon: 'image-text',
		payload: {
			...payload,
			image: {
				...input,
				pos: 3,
				size: 100,
				value: 'image',
				url,
			},
			input,
		},
		label: 'image-text',
	},
	tempTxt,
];
export const grid = {
	icon: 'book-open-outline',
	label: 'grid',
	payload: {
		type: 2,
		tableBorder: '#fff',
		rows: [
			[
				{ item: tempTxt, _id: randomUUUID() },
				{ item: tempTxt, _id: randomUUUID() },
			],
		],
		//headers: [tempTitle, tempTitle],
		colWidth: ['50%', '50%'],
	},
};
export const coverPayload = {
	icon: 'border-all-variant',
	label: 'cover',
	payload: {
		type: 3,
		tableBorder: colors.black,
	},
};
export const TEMP = [
	...elements,
	{
		icon: 'table',
		label: 'table',
		payload: {
			type: 1,
			tableBorder: colors.black,
			rows: [
				[
					{ item: tempTitle, _id: randomUUUID() },
					{ item: tempTitle, _id: randomUUUID() },
				],
				[
					{ item: tempTxt, _id: randomUUUID() },
					{ item: tempTxt, _id: randomUUUID() },
				],
			],
			//headers: [tempTitle, tempTitle],
			colWidth: ['50%', '50%'],
		},
	},
	grid,
	coverPayload,
];
export const subStatus = [
	'pending',
	'activated',
	'on leave',
	'suspended',
	'left',
];
export const profileInfo = [
	{
		_id: randomUUUID(),
		icon: 'medical-bag',
		color: colors.tertiary,
		title: 'Prescriptions',
		fb: {
			path: 'users/<uid>/temps',
			boolValue: { value: 'saved', key: 1 },
			origin: 0,
			lim: 15,
		},
	},
	{
		_id: randomUUUID(),
		icon: 'cash-multiple',
		color: colors.tertiary,
		title: 'Payments',
		fb: {
			path: 'users/<uid>/recieved',
			boolValue: { value: 'saved', key: 2 },
			origin: 0,
			lim: 15,
		},
	},

];
export const homeInfo = [
	{
		_id: randomUUUID(),
		icon: 'calendar-check-outline',
		color: colors.tertiary,
		title: 'Confirmed',
		fb: {
			path: 'users/<uid>/temps',
			boolValue: { value: 'saved', key: 1 },
			origin: 0,
			lim: 15,
		},
	},
	{
		_id: randomUUUID(),
		icon: 'calendar-question',
		color: colors.tertiary,
		title: 'Requested',
		fb: {
			path: 'users/<uid>/recieved',
			boolValue: { value: 'saved', key: 2 },
			origin: 0,
			lim: 15,
		},
	},
	{
		_id: randomUUUID(),
		icon: 'calendar-remove-outline',
		color: colors.red,
		title: 'Cancelled',
		fb: {
			path: 'users/<uid>/recieved',
			boolValue: { value: 'saved', key: 2 },
			origin: 0,
			lim: 15,
		},
	},

];

export const profileMenuOpt = [
	{
		header: 'Account',
		data: [
			{ title: 'Reset Password', icon: 'form-textbox-password' },
			{ title: 'Change Email', icon: 'email-edit' },
			{ title: 'Security Question', icon: 'lock-question' },
			{ title: 'Delete Account', icon: 'account-cancel' },
			{ title: 'Logout', icon: 'account-arrow-right' },
		],
	},
];
export const homeMenuOpt = [
	{
		header: 'Create',
		data: [{ title: 'Add New Post', icon: 'plus-circle' }],
	},
	{
		header: 'Categories',
		data: [
			{ title: 'All', icon: 'all-inclusive-box' },
			{ title: 'Creative Arts', icon: 'brush' },
			{ title: 'News', icon: 'newspaper-variant' },
			{ title: 'Events', icon: 'calendar-check' },
			{ title: 'Projects', icon: 'tools' },
		],
	},
	{
		header: 'Invite Friend',
		data: [{ title: 'Share App', icon: 'share-circle' }],
	},
	{
		header: 'Account',
		data: [{ title: 'Logout', icon: 'account-arrow-right' }],
	},
];
export const noteMenuOpt = [
	{
		header: 'Manage',
		data: [
			{ title: 'Mark all as read', icon: 'check-all' },
			{ title: 'Clear all', icon: 'notification-clear-all' },
		],
	},
	{
		header: 'Filters',
		data: [
			{ title: 'All', icon: 'view-list-outline' },
			{ title: 'Unseen', icon: 'eye-off' },
			{ title: 'Seen', icon: 'eye-check' },
		],
	},
	{
		header: 'Date Filters',
		data: [
			{ title: 'Today', icon: 'calendar-today' },
			{ title: 'Yestarday', icon: 'calendar-minus' },
			{ title: 'Pick day', icon: 'calendar-cursor' },
			{ title: 'This week', icon: 'calendar-range' },
			{ title: 'Last week', icon: 'calendar-week' },
			{ title: 'This month', icon: 'calendar-month' },
			{ title: 'Last month', icon: 'calendar-arrow-left' },
		],
	},
];
export const headerIcons = {
	Feed: [
		{
			name: 'account-check',
			color: 'black',
			size: 23,
		},
		{
			name: 'dots-vertical',
			color: 'black',
			size: 23,
		},
	],
};
