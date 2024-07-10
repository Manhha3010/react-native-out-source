import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const InsightScreen = () => {
  return (
    <View style={styles.container}>
      <Text>InsightScreen</Text>
    </View>
  );
};

export default InsightScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
