import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ms} from 'react-native-size-matters';
import {colors} from '../constants/colors';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import {DrawerActions, useNavigation} from '@react-navigation/native';

function Header({
  title,
  isBack,
}: {
  title: string;
  isBack?: boolean;
}): React.JSX.Element {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {isBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleOpenDrawer}>
            <Ionicons name="menu" size={30} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.rightContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: ms(50),
    backgroundColor: colors.primary,
  },
  leftContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: ms(20),
    fontWeight: 'bold',
    color: colors.white,
  },
  rightContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
