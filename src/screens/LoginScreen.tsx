import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, textColors} from '../constants/colors';
import {ms} from 'react-native-size-matters';
import Spacer from '../components/Spacer';
import {useSelector} from 'react-redux';
import CustomInput from '../components/CustomInput';
import PasswordInput from '../components/PasswordInput';

function LoginScreen(): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  console.log('current theme ===>> ', theme);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={[styles.heading, {color: colors.white}]}>
          Welcome to NotesXpress!
        </Text>

        <Spacer mT={26} />

        <Text style={[styles.subHeading, {color: colors.white}]}>Login</Text>

        <Spacer mT={26} />

        <CustomInput placeholder="Email" />

        <Spacer mT={20} />

        <PasswordInput />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  subContainer: {
    width: '100%',
    paddingHorizontal: ms(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: ms(25),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: ms(25),
    fontWeight: 'bold',
  },
});

export default LoginScreen;
