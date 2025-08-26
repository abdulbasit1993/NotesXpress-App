import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {backgroundColors} from '../constants/colors';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import Spacer from '../components/Spacer';
import FloatingActionButton from '../components/FloatingActionButton';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import api from '../services/api';
import {fetchNotes} from '../redux/slices/noteSlice';

function NotesScreen({navigation}): React.JSX.Element {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.themeReducer.theme);
  const notes = useSelector(state => state.noteReducer.notes.data);
  const loading = useSelector(state => state.noteReducer.loading);

  console.log('loading ========>>>> ', loading);
  console.log('notes ========>>>> ', notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'My Notes'} />
      <View
        style={[styles.container, {backgroundColor: backgroundColors[theme]}]}>
        <View style={styles.subContainer}></View>
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

export default NotesScreen;
