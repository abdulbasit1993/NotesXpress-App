import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import AppText from './AppText';
import {useSelector} from 'react-redux';
import {colors, textColors} from '../constants/colors';
import {ms} from 'react-native-size-matters';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import initials from 'initials';
import Spacer from './Spacer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {drawerMenu} from '../constants/appData';

function CustomDrawer(props) {
  const navigation = useNavigation();
  const theme = useSelector(state => state.themeReducer.theme);
  const user = useSelector(state => state.userReducer.user);

  const handleDrawerItemPress = item => {
    console.log('Pressed item ===>> ', item);
  };

  const handleLogout = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            <AppText customStyles={{color: colors.white}}>
              {initials(user?.username)}
            </AppText>
          </View>

          <Spacer mT={2} />
          <AppText customStyles={styles.profileName}>{user?.username}</AppText>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.dispatch(DrawerActions.closeDrawer());
          }}>
          <Ionicons name={'close'} size={30} color={textColors[theme]} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.itemsContainer}>
        {drawerMenu?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.drawerItem}
            onPress={() => handleDrawerItemPress(item)}>
            <AppText customStyles={styles.drawerItemText}>{item.name}</AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <AppText customStyles={styles.logoutText}>Logout</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(20),
    paddingVertical: ms(20),
  },
  profileSection: {},
  profileImage: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(90),
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: ms(18),
    fontWeight: '600',
  },
  itemsContainer: {
    flex: 1,
    paddingTop: ms(10),
  },
  drawerItem: {
    paddingVertical: ms(15),
    paddingHorizontal: ms(20),
  },
  drawerItemText: {
    fontSize: ms(18),
    fontWeight: '600',
    color: colors.white,
  },
  footer: {
    marginBottom: ms(30),
  },
  logoutButton: {
    paddingVertical: ms(10),
    paddingHorizontal: ms(20),
  },
  logoutText: {
    fontSize: ms(16),
    color: '#e60000ff',
  },
});

export default CustomDrawer;
