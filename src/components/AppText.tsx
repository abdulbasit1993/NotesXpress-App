import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {textColors} from '../constants/colors';
import {AppTextProps} from '../types/AppTextTypes';

function AppText({
  children,
  customStyles,
  ...props
}: AppTextProps): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);
  return (
    <Text
      style={[styles.text, {color: textColors[theme]}, customStyles]}
      {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: ms(20),
  },
});

export default AppText;
