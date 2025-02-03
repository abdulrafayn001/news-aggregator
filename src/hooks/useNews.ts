import { useQueries } from '@tanstack/react-query';

import { GuardianService, NewsAPIService, NYTService } from '../services/newsServices';
import { Article, NewsFilters, NewsSource } from '../types/article';

export const useNews = (filters: NewsFilters) => {
  const selectedServices = filters.selectedSources.map((source: NewsSource) => {
    switch (source) {
      case NewsSource.NewsAPI:
        return new NewsAPIService();
      case NewsSource.TheGuardian:
        return new GuardianService();
      case NewsSource.NewYorkTimes:
        return new NYTService();
      default:
        return null;
    }
  }).filter((service): service is (NewsAPIService | GuardianService | NYTService) => service !== null);

  const queries = useQueries({
    queries: selectedServices.map((service) => ({
      queryKey: ['news', service.getSourceName(), filters],
      queryFn: () => service.fetchArticles(filters),
      staleTime: 5 * 60 * 1000,
    }))
  });

  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);
  const errors = queries
    .filter(query => query.error)
    .map(query => query.error);

  const articles = queries.reduce<Article[]>((acc, query) => {
    if (query.data) {
      return [...acc, ...query.data];
    }
    return acc;
  }, []);

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return {
    articles: sortedArticles,
    isLoading,
    isError,
    errors
  };
};
