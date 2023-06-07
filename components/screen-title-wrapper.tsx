import { memo, ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import LayoutWrapper from './layout-wrapper';

const ScreenTitleWrapper = ({
	title,
	subTitle,
	children,
	styles: stylesProps,
}: {
	styles?: {};
	title?: string;
	subTitle?: string;
	children?: ReactNode;
}) => (
		<LayoutWrapper>
			<View
				style={{
					...stylesProps,
					height: '100%',
				}}
			>
				{((title || subTitle) && (
					<View style={styles.container}>
						<ImageBackground
							resizeMode='cover'
							style={styles.imageBackground}
							source={require('../assets/adaptive-icon.png')}
						/>

						<View
							style={[
								styles.textContainer,
								{
									alignSelf: 'center',
								},
							]}
						>
							{title && <Title style={styles.mainTitle}>{title}</Title>}
							{subTitle && <Title style={styles.subTitle}>{subTitle}</Title>}
						</View>
					</View>
				)) ||
					null}
				{children}
			</View>
		</LayoutWrapper>
	);
export default memo(ScreenTitleWrapper);
const styles = StyleSheet.create({
	container: {
		display: 'flex',
	},
	imageBackground: {
		borderRadius: 10,
		borderWidth: 5,
		opacity: 0.08,
		height: 140,
		width: '100%',
		position: 'absolute',
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	textContainerDesktop: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	mainTitle: {
		paddingTop: 15,
		fontSize: 36,
		fontWeight: '700',
	},
	mainTitleDesktop: {
		color: '#000',
		paddingTop: 15,
		fontSize: 36,
		fontWeight: '700',
	},
	subTitle: {
		alignSelf: 'center',
		fontWeight: '700',
	},
	subTitleDesktop: {
		color: '#000',
		alignSelf: 'center',
		fontWeight: '700',
	},
});
