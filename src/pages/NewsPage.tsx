import React, { useState } from 'react';
import { useNews } from '../hooks/useNews';
import { NewsFilters, NewsSource } from '../types/article';
import SearchForm from '../assets/components/SearchForm';
import ArticleList from '../assets/components/ArticleList';

const NewsPage: React.FC = () => {
  const [filters, setFilters] = useState<NewsFilters>({
    query: '',
    category: 'All',
    startDate: '',
    endDate: '',
    selectedSources: [NewsSource.NewsAPI, NewsSource.TheGuardian, NewsSource.NewYorkTimes],
  });

  const { articles, isLoading, isError, errors } = useNews(filters);

  const handleSearch = (newFilters: NewsFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">News Aggregator</h1>
        <p className="text-muted-foreground">
          Search and discover news from multiple trusted sources
        </p>
      </header>

      <main className="space-y-8">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        <ArticleList
          articles={articles}
          isLoading={isLoading}
          isError={isError}
          errors={errors}
        />
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          Powered by NewsAPI, The Guardian, and The New York Times
        </p>
      </footer>
    </div>
  );
};

export default NewsPage;
