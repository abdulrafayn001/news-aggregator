import React from 'react';
import { Calendar, Globe, User } from 'lucide-react';
import { Article } from '../../types/article';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl">
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              {article.title}
            </a>
          </CardTitle>
          <Badge variant="secondary">{article.source}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm line-clamp-3">
          {article.description || 'No description available'}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-4">
          {article.category && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{article.category}</span>
            </div>
          )}
          {article.author && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="line-clamp-1">{article.author}</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;