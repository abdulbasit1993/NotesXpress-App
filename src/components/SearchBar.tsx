import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {borderColors, textColors} from '../constants/colors';
import {ms} from 'react-native-size-matters';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import Ionicons from '@react-native-vector-icons/ionicons';

function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search Notes',
}): React.JSX.Element {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <View style={[styles.container, {borderColor: borderColors[theme]}]}>
      <View style={styles.searchBarView}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={[styles.input, {color: textColors[theme]}]}
          numberOfLines={1}
        />
      </View>
      <View style={styles.iconView}>
        <Ionicons name={'search'} size={20} color={textColors[theme]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 80,
    paddingHorizontal: ms(10),
  },
  searchBarView: {
    width: '85%',
  },
  iconView: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: ms(8),
  },
});

export default SearchBar;
