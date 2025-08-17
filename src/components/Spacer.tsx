import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
  mT?: number;
  mB?: number;
  mR?: number;
  mL?: number;
}

function Spacer({
  mT = 10,
  mB = 10,
  mR = 10,
  mL = 10,
}: SpacerProps): React.JSX.Element {
  return (
    <View
      style={{marginTop: mT, marginBottom: mB, marginRight: mR, marginLeft: mL}}
    />
  );
}

export default Spacer;
