import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {backgroundColors, borderColors, colors} from '../constants/colors';
import {useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import AppText from '../components/AppText';
import Spacer from '../components/Spacer';

const ConfirmDelete = ({isVisible, onConfirmPress, onClosePress}) => {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.container]}>
        <View style={styles.subContainer}>
          <AppText customStyles={{fontSize: ms(22), fontWeight: '700'}}>
            Confirm Delete
          </AppText>

          <Spacer mT={10} />

          <AppText customStyles={{textAlign: 'center'}}>
            Are you sure you want to delete this note?
          </AppText>

          <Spacer mT={20} />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onConfirmPress} style={styles.btn}>
              <AppText style={styles.btnText}>Yes</AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClosePress} style={styles.btn}>
              <AppText style={styles.btnText}>No</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: ms(280),
    borderRadius: 15,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(50),
    paddingHorizontal: ms(15),
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#142568ff',
    padding: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: ms(100),
  },
  btnText: {
    fontSize: ms(17),
    color: colors.white,
  },
});

export default ConfirmDelete;
