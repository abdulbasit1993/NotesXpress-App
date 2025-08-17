import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {borderColors, textColors} from '../constants/colors';
import {CustomInputProps} from '../types/CustomInputTypes';
import {Ionicons} from '@react-native-vector-icons/ionicons';

function PasswordInput({
  value,
  onChangeText,
  placeholderTextColor = '#eee',
}: CustomInputProps): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, {borderColor: borderColors[theme]}]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={'Password'}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={!isPasswordVisible}
        style={[styles.input, {color: textColors[theme]}]}
      />

      <TouchableOpacity>
        {isPasswordVisible ? (
          <Ionicons name="eye-off" />
        ) : (
          <Ionicons name="eye" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  input: {
    padding: 10,
  },
});

export default PasswordInput;
