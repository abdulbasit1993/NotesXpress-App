import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../constants/colors';
import {ms} from 'react-native-size-matters';

const ConfirmDelete = ({isVisible}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}></View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '50%',
  },
});

export default ConfirmDelete;
