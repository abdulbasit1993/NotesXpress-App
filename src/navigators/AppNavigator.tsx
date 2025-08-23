import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateSystemTheme} from '../redux/slices/themeSlice';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';

function AppNavigator() {
  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      dispatch(updateSystemTheme(colorScheme));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
        <Stack.Screen name="HomeStack" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
