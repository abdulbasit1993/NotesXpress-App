import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
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

function AddNoteScreen({navigation}): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);

      const noteData = {
        title,
        content,
      };

      const response = await api.post('/notes/add', noteData);

      console.log('response data (/notes/add): ', response?.data);

      if (response?.data?.success) {
        setLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      setLoading(false);
      console.log('Error in (/notes/add): ', error);
      const errorData = error?.response?.data;
      const message = errorData?.message || 'Something went wrong';

      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'Add Note'} isBack />
      <View
        style={[styles.container, {backgroundColor: backgroundColors[theme]}]}>
        <View style={styles.subContainer}>
          <CustomInput
            value={title}
            onChangeText={text => setTitle(text)}
            placeholder={'Enter Note Title'}
          />

          <Spacer mT={20} />

          <CustomInput
            value={content}
            onChangeText={text => setContent(text)}
            placeholder={'Enter Note Content'}
          />

          <Spacer mT={20} />

          <CustomButton
            title={'Submit'}
            onPress={handleSubmit}
            loading={loading}
          />
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
});

export default AddNoteScreen;
