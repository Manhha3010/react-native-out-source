import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CourseScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CourseScreen</Text>
    </View>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
