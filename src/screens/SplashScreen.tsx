import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/colors';
import {ms} from 'react-native-size-matters';
import Spacer from '../components/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen(): React.JSX.Element {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const startTime = Date.now();

      const accessToken = await AsyncStorage.getItem('@accessToken');

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(2000 - elapsedTime, 0);

      setTimeout(() => {
        if (accessToken) {
          navigation.replace('HomeStack');
        } else {
          navigation.replace('AuthStack');
        }
      }, remainingTime);
    } catch (error) {
      console.log('Error checking auth status: ', error);

      setTimeout(() => {
        navigation.replace('AuthStack');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NotesXpress</Text>
      <Spacer mT={30} />
      <ActivityIndicator size={'large'} color={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: ms(45),
    fontWeight: '900',
    color: colors.white,
  },
});

export default SplashScreen;
