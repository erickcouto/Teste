import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const LOGO_URL = 'https://partiurota.com/wp-content/uploads/2023/04/logo-partiu-rota.png';

export function HeaderLogo() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: LOGO_URL }} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 160,
    height: 40
  }
});
