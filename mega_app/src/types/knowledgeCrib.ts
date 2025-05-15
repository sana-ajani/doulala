export interface Article {
  title: string;
  author: string;
  preview: string;
  url: string;
}

export interface Category {
  value: string;
  label: string;
  emoji: string;
}

export interface KnowledgeCribResponse {
  articles: Article[];
} 