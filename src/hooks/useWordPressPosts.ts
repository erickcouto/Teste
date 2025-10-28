import { useCallback, useEffect, useState } from 'react';
import type { WordPressPost } from '../services/wordpress';

interface UseWordPressPostsParams {
  loader: () => Promise<WordPressPost[]>;
}

export function useWordPressPosts({ loader }: UseWordPressPostsParams) {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await loader();
      setPosts(response);
    } catch (err) {
      setError('Não foi possível carregar os conteúdos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return { posts, loading, error, reload: loadPosts };
}
