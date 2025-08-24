import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';

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
      <DrawerStack.Screen name="AddNote" component={AddNoteScreen} />
    </DrawerStack.Navigator>
  );
}

export default DrawerNavigator;
