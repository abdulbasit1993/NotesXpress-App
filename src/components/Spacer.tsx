import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
  mT?: number;
  mB?: number;
  mR?: number;
  mL?: number;
}

function Spacer({
  mT = 1,
  mB = 1,
  mR = 1,
  mL = 1,
}: SpacerProps): React.JSX.Element {
  return (
    <View
      style={{marginTop: mT, marginBottom: mB, marginRight: mR, marginLeft: mL}}
    />
  );
}

export default Spacer;
