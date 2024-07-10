import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { APP_SCREEN, RootNativeStackParamList } from 'navigators/screenType';
import * as React from 'react';
import MainTab from './mainTab';

import SettingScreen from 'screens/settingScreen';
import OnboardingScreen from 'screens/onboarding';

const Stack = createNativeStackNavigator<RootNativeStackParamList>();
const StackScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={APP_SCREEN.ONBOARDING_SCREEN}>
      <Stack.Screen
        name={APP_SCREEN.ONBOARDING_SCREEN}
        component={OnboardingScreen}
      />

      <Stack.Screen name={APP_SCREEN.MAIN_TAB} component={MainTab} />
      <Stack.Screen
        name={APP_SCREEN.SETTING_SCREEN}
        component={SettingScreen}
      />
    </Stack.Navigator>
  );
};

export default StackScreens;
