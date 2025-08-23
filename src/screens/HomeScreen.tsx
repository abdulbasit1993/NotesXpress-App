import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {backgroundColors} from '../constants/colors';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';

function HomeScreen({navigation}): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return 'Good Morning';
    else if (hour >= 12 && hour < 17) return 'Good Afternoon';
    else return 'Good Evening';
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'Home'} />
      <View
        style={[styles.container, {backgroundColor: backgroundColors[theme]}]}>
        <View style={styles.subContainer}>
          <AppText>{getTimeBasedGreeting()}!</AppText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    width: '100%',
    paddingHorizontal: ms(25),
  },
});

export default HomeScreen;
