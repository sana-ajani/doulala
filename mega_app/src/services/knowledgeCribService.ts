import { Article, Category, KnowledgeCribResponse } from '../types/knowledgeCrib';

const API_BASE_URL = '/crib'; // Adjust this to match your FastAPI endpoint

export const knowledgeCribService = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const categories = await response.json();
    
    // Map backend categories to frontend format with emojis
    const emojiMap: { [key: string]: string } = {
      'child_development': '👶',
      'patient_development': '👩',
      'lifestyle': '🍎',
      'risks': '⚠️',
      'wellness_mindfulness': '🧘‍♀️'
    };

    return categories.map((category: string) => ({
      value: category,
      label: category.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      emoji: emojiMap[category] || '📚'
    }));
  },

  async getArticles(category: string): Promise<Article[]> {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        // Add any other parameters your backend needs
        // age: user.age,
        // pregnancyMonth: user.pregnancyMonth,
      }),
    });
    const data: KnowledgeCribResponse = await response.json();
    return data.articles;
  }
}; 