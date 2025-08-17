import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import {useDispatch} from 'react-redux';
import {updateSystemTheme} from '../redux/slices/themeSlice';

function AppNavigator() {
  const dispatch = useDispatch();

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
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
