import { omit, some } from 'lodash';

export const reorder = (matrixArr, pos, sel, num = 1, del, sel1) => {
	const currArr = [...matrixArr];
	if (del) {
		currArr.splice(pos, num);
	} else {
		if (sel1) {
			currArr.splice(pos, num, sel, sel1);
		} else {
			currArr.splice(pos, num, sel);
		}
	}
	return currArr;
};

export const insertValue = (
	value,
	field,
	nest,
	matrix,
	subSel,
	idx,
	pos,
	newObj,
	omitter = [],
) => {
	let payload, subLoad;
	if (subSel && pos !== 16) {
		const { flag, col, row, idx: subIndex } = subSel;
		const picker = flag === 2 ? 'colWidth' : 'rows';
		console.log('picker ', picker, ' col ', col, ' row ', row);

		if (!newObj) {
			if (nest) {
				subLoad = {
					...subSel.payload,
					[nest]: {
						...omit(subSel.payload[nest], omitter),
						[field]: value,
					},
				};
			} else {
				subLoad = {
					...subSel.payload,

					[field]: value,
				};
			}
		}
		const rowArr = matrix[idx].item.payload[picker];
		let matrixArr = flag === 2 ? rowArr : rowArr[row];
		console.log('matrixArr ', matrixArr);
		let objMatrix = newObj || matrixArr[col];
		console.log('objMatrix before ', objMatrix);
		if (!newObj) {
			objMatrix = {
				...objMatrix,
				item: { ...objMatrix.item, edited: true, payload: subLoad },
			};
		}

		let finalArr = reorder(matrixArr, subIndex, objMatrix);
		console.log('finalArr ', finalArr);
		if (flag !== 2) {
			finalArr = reorder(rowArr, row, finalArr);
		}
		payload = {
			...matrix[idx].item.payload,
			[picker]: finalArr,
		};
		console.log(' payload row ', payload.rows[0]);
	} else {
		if (nest) {
			payload = {
				...matrix[idx].item.payload,
				[nest]: {
					...omit(matrix[idx].item.payload[nest], omitter),
					[field]: value,
				},
			};
		} else {
			payload = {
				...matrix[idx].item.payload,
				[field]: value,
			};
		}
	}
	return { payload, subLoad };
};

export const arrayToObj = (matrix) => {
	if (some(matrix, (item) => item.item.payload.type)) {
		return matrix.map((item) => {
			const { rows } = item.item.payload;
			console.log('screen rows ', rows);
			if (rows) {
				let sel = {};
				for (let row = 0; row < rows.length; row++) {
					const rowArr = rows[row];
					console.log('screen rowArr ', row);
					sel = { ...sel, [`${row}`]: rowArr };
				}
				console.log('screen sel ', sel);
				const newItem = {
					...item,
					item: { ...item.item, payload: { ...item.item.payload, rows: sel } },
				};
				console.log('screen newItem ', newItem);
				return newItem;
			} else {
				return item;
			}
		});
	} else {
		return matrix;
	}
};
export const ObjToArray = (matrix) => {
	if (some(matrix, (item) => item.item.payload.type)) {
		return matrix.map((item) => {
			const { rows } = item.item.payload;
			console.log('screen rows ', rows);
			if (rows) {
				const newItem = {
					...item,
					item: {
						...item.item,
						payload: { ...item.item.payload, rows: Object.values(rows) },
					},
				};
				console.log('screen newItem ', newItem);
				return newItem;
			} else {
				return item;
			}
		});
	} else {
		return matrix;
	}
};
