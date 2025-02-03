export interface Article {
  id: string;
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
  author?: string;
  category?: string;
}

export interface NewsAPIArticle {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  author: string;
}

export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  sectionName: string;
  webPublicationDate: string;
}

export interface NYTArticle {
  _id: string;
  headline: { main: string };
  web_url: string;
  section_name: string;
  pub_date: string;
  byline: { original: string };
  abstract: string;
}
export enum NewsSource {
  NewsAPI = 'NewsAPI',
  TheGuardian = 'The Guardian',
  NewYorkTimes = 'New York Times',
}

export interface NewsFilters {
  query: string;
  category: string;
  startDate: string;
  endDate: string;
  selectedSources: NewsSource[];
}

export interface NewsService {
  fetchArticles(filters: NewsFilters): Promise<Article[]>;
  getSourceName(): string;
}
