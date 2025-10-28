import React from 'react';
import { ActivityIndicator, FlatList, Linking, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { WordPressPost } from '../services/wordpress';

interface PostListProps {
  posts: WordPressPost[];
  loading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  error?: string;
  emptyMessage: string;
}

export function PostList({ posts, loading, refreshing, onRefresh, error, emptyMessage }: PostListProps) {
  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6600" />
        <Text style={styles.feedback}>Carregando conteúdo…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.feedback}>{error}</Text>
      </View>
    );
  }

  if (!posts.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.feedback}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={posts}
      keyExtractor={(item) => String(item.id)}
      refreshControl={onRefresh ? <RefreshControl refreshing={Boolean(refreshing)} onRefresh={onRefresh} /> : undefined}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => Linking.openURL(item.link).catch(console.error)}
        >
          <Text style={styles.date}>{new Date(item.date).toLocaleDateString('pt-BR')}</Text>
          <Text style={styles.title}>{item.title.rendered.replace(/<[^>]+>/g, '')}</Text>
          <Text style={styles.excerpt} numberOfLines={3}>
            {item.excerpt.rendered.replace(/<[^>]+>/g, '')}
          </Text>
          <Text style={styles.more}>Abrir no site</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  feedback: {
    marginTop: 16,
    fontSize: 16,
    color: '#444',
    textAlign: 'center'
  },
  listContent: {
    padding: 16,
    gap: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8
  },
  excerpt: {
    fontSize: 14,
    color: '#555'
  },
  more: {
    marginTop: 12,
    fontSize: 14,
    color: '#ff6600',
    fontWeight: 'bold'
  }
});
