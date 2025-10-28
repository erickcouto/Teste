import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o app Partiu Rota</Text>
      <Text style={styles.paragraph}>
        Este aplicativo foi pensado para conectar os viajantes às melhores rotas e experiências divulgadas no portal
        Partiu Rota. Explore o mapa interativo com pontos turísticos, acompanhe promoções imperdíveis e fique por
        dentro das notícias mais recentes diretamente do nosso WordPress.
      </Text>
      <Text style={styles.paragraph}>
        A aplicação consome conteúdos do site partiurota.com através da API oficial do WordPress, garantindo que as
        informações sejam sempre atualizadas para os usuários de Android e iOS.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222'
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22
  }
});
