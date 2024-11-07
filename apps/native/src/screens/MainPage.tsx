import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MainPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Main Page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MainPage;