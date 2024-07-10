import { isNullOrEmpty } from 'common/utils';
import ErrorLabel from 'components/errorLabel';
import { Label } from 'components/label';
import React, { ForwardedRef, forwardRef } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import theme from 'themes/theme.style';

import { TextInputPresets } from './preset';

import { styles } from './styles';
import { TextInputProps } from './type';

export const TextInputCustom = forwardRef(
  (
    {
      label,
      required,
      editable = true,
      rxFormat,
      multiline,
      placeholder,
      leftChildren,
      rightChildren,
      placeholderTextColor = theme.PLACE_HOLDER,
      errorMsg,
      onBlur,
      onFocus,
      onChangeText,
      value,
      style: styleOverride = {},
      styleLabelText,
      styleLabelContainer,
      styleErrorContainer,
      styleErrorText,
      preset = 'default',
      ...rest
    }: TextInputProps,
    ref: ForwardedRef<RNTextInput>,
  ) => {
    const handleTextChange = (text: string) => {
      const actualText =
        rxFormat !== undefined ? text.replace(rxFormat, '') : text;
      onChangeText && onChangeText(actualText);
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus && onFocus(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur && onBlur(e);
    };
    const isError = !isNullOrEmpty(errorMsg);
    let newStyle: any = {};
    if (Array.isArray(styleOverride)) {
      newStyle = [TextInputPresets[preset], ...styleOverride];
    } else {
      newStyle = [TextInputPresets[preset], styleOverride];
    }
    return (
      <>
        {label && (
          <Label
            label={label}
            required={required}
            styleLabelText={styleLabelText}
            styleLabelContainer={styleLabelContainer}
          />
        )}
        <View
          style={[
            styles.containerInput,
            newStyle,
            isError ? styles.inputError : {},
          ]}>
          {leftChildren}
          <RNTextInput
            {...rest}
            ref={ref}
            editable={editable}
            autoCorrect={false}
            clearButtonMode={'never'}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={
              editable === false ? theme.BORDER_INPUT : placeholderTextColor
            }
            value={value}
            placeholder={placeholder}
            style={[
              styles.input,
              // eslint-disable-next-line react-native/no-inline-styles
              !editable ? { color: 'rgba(154, 150, 150,1)' } : {},
              multiline && styles.multiline,
            ]}
            multiline={multiline}
            onChangeText={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {rightChildren}
        </View>
        <ErrorLabel
          errorMsg={errorMsg}
          textStyle={styleErrorText}
          style={styleErrorContainer}
        />
      </>
    );
  },
);
