import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

const EMAIL = 'contato@partiurota.com';
const PHONE = '+5571999999999';

export function ContactScreen() {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${EMAIL}`).catch(console.error);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${PHONE}`).catch(console.error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre em contato</Text>
      <Text style={styles.description}>Fale com a nossa equipe pelos canais abaixo:</Text>
      <Text style={styles.link} onPress={handleEmailPress}>
        {EMAIL}
      </Text>
      <Text style={styles.link} onPress={handlePhonePress}>
        {PHONE}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222'
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24
  },
  link: {
    fontSize: 18,
    color: '#ff6600',
    marginBottom: 16
  }
});
