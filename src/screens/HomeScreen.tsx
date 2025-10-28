import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapWithMarkers } from '../components/MapWithMarkers';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapWithMarkers />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
