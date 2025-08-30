import React, {useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ms} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import Header from '../components/Header';
import {backgroundColors, borderColors, textColors} from '../constants/colors';
import {useFocusEffect} from '@react-navigation/native';
import {fetchNotes} from '../redux/slices/noteSlice';
import {FontAwesome5} from '@react-native-vector-icons/fontawesome5';
import {MaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';
import Spacer from '../components/Spacer';

function NotesScreen({navigation}): React.JSX.Element {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.themeReducer.theme);
  const notes = useSelector(state => state.noteReducer.notes.data);
  const loading = useSelector(state => state.noteReducer.loading);

  const renderNotes = ({item, index}) => {
    return (
      <View
        style={[styles.noteItemContainer, {borderColor: borderColors[theme]}]}>
        <Pressable
          style={{alignSelf: 'flex-start'}}
          onPress={() => navigation.navigate('NoteDetailScreen', {data: item})}>
          <AppText customStyles={styles.noteTitle}>{item.title}</AppText>
        </Pressable>

        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <FontAwesome5 name="edit" color={textColors[theme]} size={20} />
          </TouchableOpacity>

          <Spacer mR={2} />

          <TouchableOpacity onPress={() => {}}>
            <MaterialDesignIcons
              name="delete"
              color={textColors[theme]}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchNotes());
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'My Notes'} />
      <View
        style={[styles.container, {backgroundColor: backgroundColors[theme]}]}>
        <View style={styles.subContainer}>
          {loading ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={textColors[theme]} size={'large'} />
            </View>
          ) : (
            <FlatList data={notes} renderItem={renderNotes} />
          )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: ms(10),
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: ms(20),
  },
  noteTitleContainer: {
    width: 'auto',
    backgroundColor: 'green',
  },
  noteTitle: {
    fontSize: ms(15),
    fontWeight: '500',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
});

export default NotesScreen;
