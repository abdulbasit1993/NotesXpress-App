import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Keyboard,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {colors, textColors} from '../constants/colors';
import {ms} from 'react-native-size-matters';
import Spacer from '../components/Spacer';
import {useDispatch, useSelector} from 'react-redux';
import CustomInput from '../components/CustomInput';
import PasswordInput from '../components/PasswordInput';
import CustomButton from '../components/CustomButton';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkEmpty, validateEmail} from '../utils/validations';
import {setUser} from '../redux/slices/userSlice';

function LoginScreen({navigation}): React.JSX.Element {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.themeReducer.theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();

      const sanitizedEmail = email.trim();
      const sanitizedPassword = password.trim();

      if (checkEmpty(sanitizedEmail)) {
        ToastAndroid.show('Email is required', ToastAndroid.SHORT);
        return;
      }

      if (checkEmpty(sanitizedPassword)) {
        ToastAndroid.show('Password is required', ToastAndroid.SHORT);
        return;
      }

      if (!validateEmail(sanitizedEmail)) {
        ToastAndroid.show('Invalid email', ToastAndroid.SHORT);
        return;
      }

      setLoading(true);

      const loginData = {
        email: email,
        password: password,
      };

      const response = await api.post('/auth/login', loginData);

      console.log('response data (/auth/login) ===>> ', response?.data);

      if (response?.data?.success) {
        setLoading(false);

        if (response?.data?.user?.status !== 'ACTIVE') {
          ToastAndroid.show(
            'Your account is not active. Please contact admin',
            ToastAndroid.SHORT,
          );
          return;
        }

        if (response?.data?.user?.role !== 'USER') {
          ToastAndroid.show(
            'Access Denied. Please contact admin',
            ToastAndroid.SHORT,
          );
          return;
        }

        ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT);

        const accessToken = response?.data?.token;

        await AsyncStorage.setItem('@accessToken', accessToken);

        dispatch(setUser(response?.data?.user));

        navigation.replace('HomeStack', {
          screen: 'Home',
        });
      }
    } catch (error) {
      const errorMessage = error.response.data.message;
      console.log('Error in (/auth/login) ===>> ', errorMessage);
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={[styles.heading, {color: colors.white}]}>
          Welcome to NotesXpress!
        </Text>

        <Spacer mT={26} />

        <Text style={[styles.subHeading, {color: colors.white}]}>
          Login To Your Account
        </Text>

        <Spacer mT={26} />

        <CustomInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Enter Your Email"
        />

        <Spacer mT={20} />

        <PasswordInput
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Spacer mT={20} />

        <CustomButton
          title={'Login'}
          onPress={() => handleSubmit()}
          loading={loading}
          customStyle={{backgroundColor: colors.white}}
          customTextStyle={{color: colors.black}}
          loadingIndicatorColor={colors.black}
        />

        <Spacer mT={20} />

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: textColors[theme],
              textAlign: 'center',
              marginRight: ms(5),
            }}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={{color: textColors[theme], fontWeight: '700'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
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
