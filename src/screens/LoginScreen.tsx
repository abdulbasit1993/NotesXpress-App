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
import {useSelector} from 'react-redux';
import CustomInput from '../components/CustomInput';
import PasswordInput from '../components/PasswordInput';
import CustomButton from '../components/CustomButton';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen(): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);

      const loginData = {
        email: email,
        password: password,
      };

      const response = await api.post('/auth/login', loginData);

      console.log('response data (/auth/login) ===>> ', response?.data);

      if (response?.data?.success) {
        setLoading(false);

        ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT);

        const accessToken = response?.data?.token;

        await AsyncStorage.setItem('@accessToken', accessToken);
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
            Already have an account?
          </Text>

          <TouchableOpacity>
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
