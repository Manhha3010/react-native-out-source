import { StyleSheet } from 'react-native';
import theme from 'themes/theme.style';

export const TextInputPresets = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: theme.BORDER_INPUT,
  },
});

export type TextInputPresetName = keyof typeof TextInputPresets;
