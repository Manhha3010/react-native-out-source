import { LabelProps } from 'components/label/type';
import React from 'react';
import {
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import Animated from 'react-native-reanimated';
import { TextInputPresetName } from './preset';

export type ErrorLineProps = {
  error: Animated.SharedValue<boolean>;
  disabled: Animated.SharedValue<boolean>;
};

export type FocusedLineProps = {
  focused: Animated.SharedValue<boolean>;
  disabled: Animated.SharedValue<boolean>;
};

export type TextInputProps = RNTextInputProps & {
  /**
   * Format text before call onChangeText function
   * @default undefined
   */
  rxFormat?: RegExp;

  /**
   * Children right input.(ex:Icon show/hide password)
   */
  leftChildren?: React.ReactNode;
  /**
   * Children right input.(ex:Icon show/hide password)
   */
  rightChildren?: React.ReactNode;
  preset?: TextInputPresetName;
  errorMsg?: string;
  styleErrorContainer?: ViewStyle;
  styleErrorText?: TextStyle;
} & LabelProps;
