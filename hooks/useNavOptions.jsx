import { useEffect } from 'react';
import Header from '../components/Header';
import IconHolder from '../components/icon-holder';

const useNavOptions = (
	navigation,
	width,
	payload,
	iconPress,
	title,
	showImg,
	isElipse,
) => {
	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<Header
					{...{
						showImg,
						title,
						isElipse,
					}}
				/>
			),
			headerRight:width? () => (<IconHolder
							{...{ payload, width }}
							//width={60}
							onClick={iconPress}
						/>
					
			):undefined,
		});
	}, [navigation, width, iconPress, payload, title]);
};

export default useNavOptions;
