import { memo } from 'react';
import { List } from 'react-native-paper';

const ListMenu = ({
	payload,

	onOptClick,
}: {
	payload: any[];

	onOptClick: (idx: number, num: number) => void;
}) => (
	<>
		{payload.map(({ header, data }, num: number) => (
			<List.Section key={header}>
				<List.Subheader>{header}</List.Subheader>
				{data.map(({ title, icon }, idx: number) => (
					<List.Item
						key={title}
						onPress={() => onOptClick(idx, num)}
						{...{ title }}
						left={() => <List.Icon {...{ icon }} />}
					/>
				))}
			</List.Section>
		))}
	</>
);

export default memo(ListMenu);
