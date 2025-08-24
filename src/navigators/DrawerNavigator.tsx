import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';

const DrawerStack = createDrawerNavigator();

function DrawerNavigator(): React.JSX.Element {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}>
      <DrawerStack.Screen name="Home" component={HomeScreen} />
    </DrawerStack.Navigator>
  );
}

export default DrawerNavigator;
