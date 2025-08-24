import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {backgroundColors} from '../constants/colors';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import Spacer from '../components/Spacer';
import FloatingActionButton from '../components/FloatingActionButton';

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

          <Spacer mT={90} />

          <AppText customStyles={{textAlign: 'center'}}>
            To get started, tap on the Add (+) button on the bottom right to add
            a new note.
          </AppText>
        </View>

        <FloatingActionButton
          onPress={() => {
            navigation.navigate('AddNote');
          }}
        />
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
    paddingVertical: ms(20),
  },
});

export default HomeScreen;
