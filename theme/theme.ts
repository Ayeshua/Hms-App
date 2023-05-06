import { DefaultTheme } from 'react-native-paper';
import { colors } from './colors';

export const theme = {
  ...DefaultTheme,
  roundness: 4,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  button: {
    borderColor: colors.primary,
  },
};
