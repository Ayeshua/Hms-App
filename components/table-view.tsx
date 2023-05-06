import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { colors } from '../theme/colors';
import Combo from './combo';

const TableView = ({
	rows,
	colWidth,
	subSelId,
	last,
	sel,
	tableBorder,
	editFun,
	inflater,
	type,
}: {
	rows: any[];
	colWidth: any[];
	last: boolean;
	sel: boolean;
	inflater: boolean;
	type: number;
	tableBorder: string;
	editFun: (
		pos: number,
		nest?: string,
		flag?: number,
		row?: number,
		col?: number,
	) => void;
	subSelId?: string | null;
}) => (
	<TouchableOpacity
		style={{
			paddingVertical: 10,
			marginBottom: last ? 250 : 0,
			borderColor: inflater ? '#fff' : sel ? colors.secondary : colors.coolGray,
			borderWidth: 1,
		}}
		disabled={inflater || sel}
		onPress={() => editFun(-1, null, type === 1 ? 0 : 1, 0, 0)}
	>
		{rows.map((cols: any[], idx: number) => (
			<DataTable.Row key={`${idx}`} style={{ borderBottomWidth: 0 }}>
				{cols.map((item, colIdx: number) => (
					<TouchableOpacity
						key={`${item._id}${idx}`}
						style={{
							width: colWidth[colIdx],
							height: '100%',
							borderColor:
								subSelId === item._id ? colors.secondary : tableBorder,
							borderWidth: 1,
						}}
						disabled={subSelId === item._id}
					>
						<Combo
							sel={subSelId === item._id}
							{...{ ...item, borderColor: '#fff', host: 0, inflater }}
							editFun={(pos: number, nest?: string) => {
								console.log('col pos ', pos);

								editFun(pos, nest, idx > 0 || type === 2 ? 1 : 0, colIdx, idx);
							}}
						/>
					</TouchableOpacity>
				))}
			</DataTable.Row>
		))}
	</TouchableOpacity>
);

export default memo(TableView);
