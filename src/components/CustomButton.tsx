import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {borderColors, colors, textColors} from '../constants/colors';
import {CustomInputProps} from '../types/CustomInputTypes';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import {ms} from 'react-native-size-matters';

function CustomButton({
  title,
  onPress,
  loading,
  disabled,
  customStyle,
  customTextStyle,
  loadingIndicatorColor = colors.white,
}): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={[styles.container, customStyle]}>
      {loading ? (
        <ActivityIndicator color={loadingIndicatorColor} size={'small'} />
      ) : (
        <Text
          style={[
            styles.titleText,
            {color: textColors[theme]},
            customTextStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(10),
    borderRadius: 5,
    width: '100%',
    height: ms(45),
  },
  titleText: {
    fontSize: ms(18),
    fontWeight: '600',
  },
});

export default CustomButton;
