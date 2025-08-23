import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';

const DrawerStack = createDrawerNavigator();

function DrawerNavigator(): React.JSX.Element {
  return (
    <DrawerStack.Navigator
      screenOptions={{headerShown: false, swipeEnabled: false}}
      initialRouteName="Home">
      <DrawerStack.Screen name="Home" component={HomeScreen} />
    </DrawerStack.Navigator>
  );
}

export default DrawerNavigator;
