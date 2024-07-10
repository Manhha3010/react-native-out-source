import React from 'react';
import AppRoutes from 'navigators/appRoutes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setupLocaleTime } from 'common/setup/setupLocaleTime';
const App = () => {
  //setup Track Player
  React.useEffect(() => {
    setupLocaleTime();
  }, []);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppRoutes />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
