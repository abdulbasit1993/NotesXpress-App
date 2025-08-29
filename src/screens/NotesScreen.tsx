import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import Header from '../components/Header';
import {backgroundColors, borderColors} from '../constants/colors';
import {fetchNotes} from '../redux/slices/noteSlice';

function NotesScreen({navigation}): React.JSX.Element {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.themeReducer.theme);
  const notes = useSelector(state => state.noteReducer.notes.data);
  const loading = useSelector(state => state.noteReducer.loading);

  console.log('loading ========>>>> ', loading);
  console.log('notes ========>>>> ', notes);

  const renderNotes = ({item, index}) => {
    return (
      <View
        style={[styles.noteItemContainer, {borderColor: borderColors[theme]}]}>
        <AppText customStyles={styles.noteTitle}>{item.title}</AppText>
      </View>
    );
  };

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'My Notes'} />
      <View
        style={[styles.container, {backgroundColor: backgroundColors[theme]}]}>
        <View style={styles.subContainer}>
          <FlatList data={notes} renderItem={renderNotes} />
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
  noteItemContainer: {
    padding: ms(10),
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: ms(20),
  },
  noteTitle: {
    fontSize: ms(15),
    fontWeight: '500',
  },
});

export default NotesScreen;
