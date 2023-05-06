import { DRAFT_URL, subStatus } from '../constants';
import { DateTimeFormat } from './date-formatter';
import { generateHtml } from './html-converter';
import randomUUUID from './UUUID';
import { format } from 'date-fns';
import { ObjToArray } from './reorder';
import { colors } from '../theme/colors';
export const NewTemp = (userId, name) => {
	const date = new Date();
	const createdAt = date.toString();
	const _id = randomUUUID();

	return {
		_id,
		createdAt,
		url: DRAFT_URL,

		ref: `users/${userId}/${_id}`,
		updatedAt: createdAt,
		title: `Draft ${DateTimeFormat(createdAt)}`,
		userId,
		name,
	};
};
export const getTemp = (payload) => {
	const matrix = ObjToArray(payload.matrix);
	const html = generateHtml(matrix);

	return {
		...payload,
		matrix,
		html,
		subTitle: getSubTitle(format(new Date(payload.createdAt), 'dd MMM yyyy')),
	};
};

export const getSub = (payload) => {
	//const isAdmin = subPath.includes('staff');
	const { status } = payload;
	const name = status ? 'file' : 'information';
	const color = status ? colors.secondary : colors.red;
	const rotate = status ? '0deg' : '180deg';
	return {
		...payload,
		sub: true,

		subTitle: getSubTitle(subStatus[status], name, color, !!status, rotate),
	};
};
export const getSubTitle = (
	title,
	name = 'pencil',
	color = 'black',
	disabled = false,
	rotate = '0deg',
) => {
	return {
		title,
		width: 18,
		payload: [
			{
				name,
				color,
				size: 18,
				disabled,
				rotate,
			},
		],
	};
};
export const DraftTemp = (currentTemplate) => {
	const { createdAt, matrix } = currentTemplate || {};
	if (matrix) {
		return {
			...currentTemplate,
			html: generateHtml(matrix),
			subTitle: getSubTitle(format(new Date(createdAt), 'dd MMM yyyy')),
		};
	} else {
		return null;
	}
};
export const getSel = (item, index, flag, col, row) => {
	let subSel;
	if (flag !== undefined) {
		const { item: nestedItem, _id: id } = item.item.payload.rows[row][col];
		console.log('nestedItem ', nestedItem);
		subSel = {
			...nestedItem,
			flag,
			col,
			row,
			_id: id,
			edited: nestedItem.edited,
			idx: col,
			tableId: item._id,
		};
	}
	return {
		...item.item,
		idx: index,
		_id: item._id,
		subSel,
	};
};

export const getMatArr = (matrix, uri) => {
	const seed = uri ? [{ parent: true, uri, key: 'url' }] : [];
	return matrix.reduce((cal, item, index) => {
		const { image, rows } = item.item.payload;
		console.log('screen rows ', rows);
		if (rows) {
			const sel = [];
			for (let row = 0; row < rows.length; row++) {
				const rowArr = rows[row];
				console.log('screen rowArr ', row);
				for (let col = 0; col < rowArr.length; col++) {
					const element = rowArr[col];
					const { image } = element.item.payload;
					console.log('screen col ', element, ' image ', image);
					if (image?.uri) {
						sel.push({
							...getSel(item, index, 1, col, row),
							uri: image?.uri,
						});
					}
				}
			}
			console.log('screen sel ', sel);
			return [...cal, ...sel];
		} else if (image?.uri) {
			const sel = getSel(item, index);
			return [...cal, { ...sel, uri: image?.uri }];
		} else {
			return cal;
		}
	}, seed);
};
