import { TextStyle, ViewStyle } from 'react-native';

export type LabelProps = {
  /**
   * Label of text input
   */
  label?: string;

  /**
   * Add red dot right label or not
   * @default false
   */
  required?: boolean;
  styleLabelContainer?: ViewStyle;
  styleLabelText?: TextStyle;
};
