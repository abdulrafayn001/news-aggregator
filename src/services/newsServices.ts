import axios from 'axios';
import { Article, NewsFilters, NewsAPIArticle, GuardianArticle, NYTArticle, NewsService, NewsSource } from '../types/article';

abstract class BaseNewsService implements NewsService {
  protected abstract endpoint: string;
  protected abstract apiKey: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract mapToArticle(data: any): Article;
  abstract getSourceName(): string;

  protected async fetchFromApi(url: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching from ${this.getSourceName()}:`, error);
      return null;
    }
  }

  abstract fetchArticles(filters: NewsFilters): Promise<Article[]>;
}

export class NewsAPIService extends BaseNewsService {
  protected endpoint = 'https://newsapi.org/v2/everything';
  protected apiKey = import.meta.env.VITE_APP_NEWS_API_KEY;

  getSourceName(): string {
    return NewsSource.NewsAPI;
  }

  async fetchArticles(filters: NewsFilters): Promise<Article[]> {
    const { query, startDate, endDate, category } = filters;

    if (category !== 'All') {
        console.warn(`${this.getSourceName()} does not support category filtering. Returning empty results.`);
        return [];
    }

    const searchQuery = query?.trim();
    if(!searchQuery) {
      return [];
    }

    const data = await this.fetchFromApi(
      `${this.endpoint}?q=${encodeURIComponent(searchQuery)}${startDate ? `&from=${startDate}` : ''}${endDate ? `&to=${endDate}` : ''}&sortBy=publishedAt&apiKey=${this.apiKey}`
    );

    return data?.articles.map(this.mapToArticle) ?? [];
  }

  mapToArticle(article: NewsAPIArticle): Article {
    return {
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      author: article.author
    };
  }
}

export class GuardianService extends BaseNewsService {
  protected endpoint = 'https://content.guardianapis.com/search';
  protected apiKey = import.meta.env.VITE_APP_GUARDIAN_API_KEY || '';

  getSourceName(): string {
    return NewsSource.TheGuardian;
  }

  mapToArticle(article: GuardianArticle): Article {
    return {
      id: article.id,
      title: article.webTitle,
      description: null,
      url: article.webUrl,
      source: NewsSource.TheGuardian,
      publishedAt: article.webPublicationDate,
      category: article.sectionName
    };
  }

  async fetchArticles(filters: NewsFilters): Promise<Article[]> {
    const { query, startDate, endDate, category } = filters;
    const data = await this.fetchFromApi(
      `${this.endpoint}?q=${query}${startDate ? `&from-date=${startDate}` : ''}${endDate ? `&to-date=${endDate}` : ''}${category && category !== 'All' ? `&sectionName=${category}` : ''}&api-key=${this.apiKey}`
    );
    return data?.response.results.map(this.mapToArticle) ?? [];
  }
}

export class NYTService extends BaseNewsService {
  protected endpoint = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  protected apiKey = import.meta.env.VITE_APP_NYT_API_KEY || '';

  getSourceName(): string {
    return NewsSource.NewYorkTimes;
  }

  mapToArticle(article: NYTArticle): Article {
    return {
      id: article._id,
      title: article.headline.main,
      description: article.abstract,
      url: article.web_url,
      source: NewsSource.NewYorkTimes,
      publishedAt: article.pub_date,
      author: article.byline.original,
      category: article.section_name
    };
  }

  async fetchArticles(filters: NewsFilters): Promise<Article[]> {
    const { query, startDate, endDate, category } = filters;
    const data = await this.fetchFromApi(
      `${this.endpoint}?q=${query}${startDate ? `&begin_date=${startDate.replace(/-/g, '')}` : ''}${endDate ? `&end_date=${endDate.replace(/-/g, '')}` : ''}${category && category !== 'All' ? `&fq=section_name:"${category}"` : ''}&api-key=${this.apiKey}`
    );
    return data?.response.docs.map(this.mapToArticle) ?? [];
  }
}
