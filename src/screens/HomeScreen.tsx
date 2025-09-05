import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {backgroundColors} from '../constants/colors';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import Spacer from '../components/Spacer';
import FloatingActionButton from '../components/FloatingActionButton';
import api from '../services/api';
import moment from 'moment';

function HomeScreen({navigation}): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);
  const user = useSelector(state => state.userReducer.user);
  const username = user?.username || '';
  const [userStats, setUserStats] = useState({});

  const lastUpdatedDate = userStats?.latestActivity
    ? new Date(userStats?.latestActivity)
    : new Date();

  const formattedDate = moment(lastUpdatedDate).format('MMM DD, YYYY, hh:mm A');

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return 'Good Morning';
    else if (hour >= 12 && hour < 17) return 'Good Afternoon';
    else return 'Good Evening';
  };

  const getUserStats = async () => {
    try {
      const response = await api.get('/users/user-stats');

      console.log('response data (/users/user-stats): ', response?.data);

      if (response?.data?.success) {
        setUserStats(response?.data?.data);
      }
    } catch (error) {
      console.log('Error in (getUserStats): ', error);
    }
  };

  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'Home'} />
      <View
        style={[styles.container, {backgroundColor: backgroundColors[theme]}]}>
        <View style={styles.subContainer}>
          <AppText>
            {getTimeBasedGreeting()}, {username}!
          </AppText>

          <Spacer mT={20} />

          <AppText customStyles={{}}>Welcome back to NotesXpress! 👋</AppText>

          <Spacer mT={20} />

          {userStats?.totalUserNotes && (
            <AppText customStyles={{}}>
              {`You have ${userStats?.totalUserNotes} notes`}
            </AppText>
          )}

          <Spacer mT={20} />

          {userStats?.latestActivity && (
            <>
              <AppText customStyles={{}}>{`Last Updated:`}</AppText>

              <AppText customStyles={{}}>{`${formattedDate}`}</AppText>
            </>
          )}
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
