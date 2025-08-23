import React from 'react';
import {Text, TextStyle} from 'react-native';

export interface AppTextProps extends React.ComponentProps<typeof Text> {
  children: React.ReactNode;
  customStyles?: TextStyle;
}
