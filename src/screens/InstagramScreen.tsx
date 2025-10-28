import React from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

const INSTAGRAM_URL = 'https://www.instagram.com/partiurota/';
const INSTAGRAM_ICON = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png';

export function InstagramScreen() {
  const handleOpenInstagram = () => {
    Linking.openURL(INSTAGRAM_URL).catch(console.error);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: INSTAGRAM_ICON }} style={styles.icon} />
      <Text style={styles.title}>Siga a Partiu Rota no Instagram</Text>
      <Text style={styles.description}>
        Fique por dentro das últimas rotas, bastidores e novidades acompanhando o nosso perfil oficial.
      </Text>
      <Pressable style={styles.button} onPress={handleOpenInstagram}>
        <Text style={styles.buttonText}>Abrir Instagram</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#fff'
  },
  icon: {
    width: 96,
    height: 96,
    marginBottom: 24
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center'
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
    textAlign: 'center'
  },
  button: {
    marginTop: 24,
    backgroundColor: '#ff6600',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
