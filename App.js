import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import AppContainer from './stacks/AppStack';
import { store } from './data/redux/store';
import { SheetProvider } from 'react-native-actions-sheet';
import { Provider as PaperProvider } from 'react-native-paper';

import { theme } from './theme/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { colors } from './theme/colors';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/lib/persistStore';

SplashScreen.preventAutoHideAsync();
const persistedStore = persistStore(store);

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	function cacheImages(images) {
		return images.map((image) => {
			if (typeof image === 'string') {
				return Image.prefetch(image);
			}
			return Asset.fromModule(image).downloadAsync();
		});
	}

	const cacheFonts = (fonts) => {
		return fonts.map((font) => Font.loadAsync(font));
	};

	const _loadAssetsAsync = async () => {
		const imageAssets = cacheImages([
			require('./assets/adaptive-icon.png'),
			require('./assets/favicon.png'),
			require('./assets/icon.png'),
			require('./assets/splash.png'),
		]);

		const fontAssets = cacheFonts([MaterialCommunityIcons.font]);

		await Promise.all([...fontAssets, ...imageAssets]);
	};
	useEffect(() => {
		async function prepare() {
			try {
				// Keep the splash screen visible while we fetch resources
				// Pre-load fonts, make any API calls you need to do here
				await _loadAssetsAsync();
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	if (!appIsReady) {
		return null;
	}
	return (
		<Provider store={store}>
			<PersistGate persistor={persistedStore} loading={null}>
				<SafeAreaProvider>
					<PaperProvider theme={theme}>
						<StatusBar animated={true} backgroundColor={colors.primary} />
						<SheetProvider>
							<AppContainer {...{ appIsReady, SplashScreen }} />
						</SheetProvider>
					</PaperProvider>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
}
