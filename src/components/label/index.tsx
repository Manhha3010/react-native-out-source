import TextApp from 'components/textApp';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from 'themes/theme.style';

import { LabelProps } from './type';

export const Label = ({
  label,
  required,
  styleLabelText,
  styleLabelContainer,
}: LabelProps) => {
  return (
    <View style={[styles.rowLabel, styleLabelContainer]}>
      <TextApp style={[{ color: theme.TEXT }, styleLabelText]}>{label}</TextApp>
      {required ? <TextApp style={{ color: theme.ERROR }}> *</TextApp> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
