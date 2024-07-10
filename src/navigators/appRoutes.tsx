import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationService';

import { StatusBar } from 'react-native';
import { Host } from 'react-native-portalize';
import StackScreens from './stack';

const AppRoutes = () => {
  // const isSignIn = true;
  return (
    <NavigationContainer ref={navigationRef}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Host>{StackScreens()}</Host>
      </>
    </NavigationContainer>
  );
};

export default AppRoutes;
