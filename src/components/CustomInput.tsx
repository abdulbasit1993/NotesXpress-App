import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {borderColors, textColors} from '../constants/colors';
import {CustomInputProps} from '../types/CustomInputTypes';

function CustomInput({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = '#eee',
}: CustomInputProps): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      style={[
        styles.input,
        {borderColor: borderColors[theme], color: textColors[theme]},
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
});

export default CustomInput;
