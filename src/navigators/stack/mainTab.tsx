import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { APP_SCREEN } from 'navigators/screenType';
import SettingScreen from 'screens/settingScreen';
import HomeScreen from 'screens/homeScreen';
import CourseScreen from 'screens/CourseScreen';
import InsightScreen from 'screens/InsightScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      initialRouteName={APP_SCREEN.HOME_SCREEN}>
      <Tab.Screen name={BOTTOM_TAB_ROUTE.home} component={HomeScreen} />
      <Tab.Screen name={BOTTOM_TAB_ROUTE.course} component={CourseScreen} />
      <Tab.Screen name={BOTTOM_TAB_ROUTE.insight} component={InsightScreen} />
      <Tab.Screen name={BOTTOM_TAB_ROUTE.setting} component={SettingScreen} />
    </Tab.Navigator>
  );
}

export const BOTTOM_TAB_ROUTE = {
  home: 'Home',
  course: 'Course',
  insight: 'Insight',
  setting: 'Cài đặt',
};
