import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

import { useCallback } from 'react';

const useScreenOrientation = (orientationIsLandscape) => {
	useFocusEffect(
		useCallback(() => {
			if (orientationIsLandscape) {
				ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
				);
			} else {
				ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
			}
		}, [orientationIsLandscape]),
	);
};

export default useScreenOrientation;
