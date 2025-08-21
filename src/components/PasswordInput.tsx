import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {borderColors, textColors} from '../constants/colors';
import {CustomInputProps} from '../types/CustomInputTypes';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import {ms} from 'react-native-size-matters';

function PasswordInput({
  value,
  onChangeText,
  placeholder = 'Enter Your Password',
  placeholderTextColor = '#eee',
}: CustomInputProps): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, {borderColor: borderColors[theme]}]}>
      <View style={styles.textInputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={!isPasswordVisible}
          style={[styles.input, {color: textColors[theme]}]}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsPasswordVisible(!isPasswordVisible);
        }}
        style={{marginRight: ms(10)}}>
        {isPasswordVisible ? (
          <Ionicons name="eye-off" color={textColors[theme]} size={20} />
        ) : (
          <Ionicons name="eye" color={textColors[theme]} size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputContainer: {
    width: '85%',
  },
  input: {
    padding: 10,
  },
});

export default PasswordInput;
