import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { PostList } from '../components/PostList';
import { fetchNews } from '../services/wordpress';
import { useWordPressPosts } from '../hooks/useWordPressPosts';

export function NewsScreen() {
  const loader = useCallback(() => fetchNews(), []);
  const { posts, loading, error, reload } = useWordPressPosts({ loader });
  const isRefreshing = loading && posts.length > 0;

  return (
    <View style={styles.container}>
      <PostList
        posts={posts}
        loading={loading}
        refreshing={isRefreshing}
        onRefresh={reload}
        error={error}
        emptyMessage="Nenhuma notícia encontrada."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  }
});
