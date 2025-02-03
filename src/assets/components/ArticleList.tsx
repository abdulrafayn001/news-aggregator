import React from 'react';
import ArticleCard from './ArticleCard';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Article } from '../../types/article';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  errors?: any[];
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  isLoading,
  isError,
  errors = [],
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch articles. Please try again later.
          {errors.map((error, index) => (
            <div key={index} className="text-sm mt-1">
              {error?.message}
            </div>
          ))}
        </AlertDescription>
      </Alert>
    );
  }

  if (articles.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Results</AlertTitle>
        <AlertDescription>
          No articles found. Try adjusting your search criteria.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;