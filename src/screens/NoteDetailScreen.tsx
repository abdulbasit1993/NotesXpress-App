import React, {useState, useCallback} from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AppText from '../components/AppText';
import Header from '../components/Header';
import {backgroundColors, borderColors, textColors} from '../constants/colors';
import api from '../services/api';
import moment from 'moment';
import Spacer from '../components/Spacer';

function NoteDetailScreen({navigation, route}): React.JSX.Element {
  const noteId = route?.params?.data?._id;
  const theme = useSelector(state => state.themeReducer.theme);
  const [loading, setLoading] = useState(false);
  const [noteDetail, setNoteDetail] = useState({});

  console.log('noteDetail ========>>>> ', noteDetail);

  const createdDate = new Date(noteDetail?.createdAt);
  const updatedDate = new Date(noteDetail?.updatedAt);

  const formattedCreatedDate = moment(createdDate).format(
    'MMM DD, YYYY, hh:mm A',
  );
  const showUpdatedDate = updatedDate > createdDate;
  const formattedUpdatedDate = moment(updatedDate).format(
    'MMM DD, YYYY, hh:mm A',
  );

  const displayDate = updatedDate > createdDate ? updatedDate : createdDate;
  const dateLabel = updatedDate > createdDate ? 'Last Updated' : 'Created';

  const getNoteDetails = async () => {
    if (!noteId) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/notes/get/${noteId}`);

      if (response?.data?.success) {
        setLoading(false);
        const noteData = response?.data?.data;
        setNoteDetail(noteData);
      }
    } catch (error) {
      console.log('Error in (/notes/): ', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNoteDetails();
    }, [noteId]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title={'Note Details'}
        isBack
        onBackPress={() => navigation.navigate('Notes')}
      />
      <View
        style={[styles.container, {backgroundColor: backgroundColors[theme]}]}>
        <View style={styles.subContainer}>
          <ScrollView>
            {loading ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={textColors[theme]} size={'large'} />
              </View>
            ) : (
              <>
                <AppText customStyles={styles.noteTitle}>
                  {noteDetail?.title}
                </AppText>

                <Spacer mT={2} />

                <AppText customStyles={styles.date}>
                  {`Created: ${formattedCreatedDate}`}
                </AppText>

                {showUpdatedDate && (
                  <>
                    <Spacer mT={1} />
                    <AppText customStyles={styles.date}>
                      {`Last Updated: ${formattedUpdatedDate}`}
                    </AppText>
                  </>
                )}

                <Spacer mT={50} />

                <AppText customStyles={styles.noteContent}>
                  {noteDetail?.content}
                </AppText>
              </>
            )}
          </ScrollView>
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
    paddingVertical: ms(20),
  },
  noteTitle: {
    fontSize: ms(28),
    fontWeight: '800',
  },
  date: {
    fontSize: ms(14),
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#B5B5B5',
  },
  noteContent: {
    fontSize: ms(16),
    fontWeight: '400',
  },
});

export default NoteDetailScreen;
