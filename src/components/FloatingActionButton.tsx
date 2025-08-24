import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import {colors} from '../constants/colors';
import {Ionicons} from '@react-native-vector-icons/ionicons';

function FloatingActionButton({
  onPress,
}: {
  onPress: () => void;
}): React.JSX.Element {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="add" size={30} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: ms(50),
    height: ms(50),
    borderRadius: 90,
    position: 'absolute',
    bottom: ms(25),
    right: ms(25),
  },
});

export default FloatingActionButton;
