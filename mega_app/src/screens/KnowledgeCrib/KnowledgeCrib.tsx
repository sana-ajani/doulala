import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { BottomNav } from '../../components/BottomNav';

interface Article {
  title: string;
  author: string;
  preview: string;
  url: string;
}

interface Category {
  value: string;
  label: string;
  emoji: string;
}

export const KnowledgeCrib = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('child_development');

  const categories: Category[] = [
    { emoji: "👶", label: "Baby Development", value: "child_development" },
    { emoji: "👩", label: "Patient Development", value: "patient_development" },
    { emoji: "⚠️", label: "Risks", value: "risks" },
    { emoji: "🍎", label: "Lifestyle", value: "lifestyle" },
    { emoji: "🧘‍♀️", label: "Wellness", value: "wellness_mindfulness" },
  ];

  const articlesByCategory: Record<string, Article[]> = {
    child_development: [
      {
        title: "3 Questions to Ask Yourself Before Getting Prenatal Genetic Testing",
        author: "ACOG Editorial Team",
        preview: "Important considerations and guidance for making informed decisions about prenatal genetic testing options...",
        url: "https://www.acog.org/womens-health/experts-and-stories/the-latest/3-questions-to-ask-yourself-before-getting-prenatal-genetic-testing"
      },
      {
        title: "How to Prepare for Breastfeeding in the Month Before Birth",
        author: "ACOG Editorial Team",
        preview: "Essential tips and guidance for preparing yourself for successful breastfeeding before your baby arrives...",
        url: "https://www.acog.org/womens-health/experts-and-stories/the-latest/how-to-prepare-for-breastfeeding-in-the-month-before-birth"
      },
      {
        title: "Making Sense of Childbirth Pain Relief Options",
        author: "ACOG Editorial Team",
        preview: "A comprehensive guide to understanding different pain management options available during childbirth...",
        url: "https://www.acog.org/womens-health/experts-and-stories/the-latest/making-sense-of-childbirth-pain-relief-options"
      }
    ],
    lifestyle: [
      {
        title: "Nutrition During Pregnancy",
        author: "ACOG Editorial Team",
        preview: "Complete guide to maintaining a healthy diet during pregnancy, including essential nutrients and food safety...",
        url: "https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy"
      },
      {
        title: "Pregnancy Diet and Nutrition: What to Eat and What to Avoid",
        author: "Healthline Editorial Team",
        preview: "Comprehensive overview of pregnancy nutrition, including foods to eat and avoid for optimal health...",
        url: "https://www.healthline.com/health/pregnancy/diet-nutrition"
      },
      {
        title: "A Day in the Life of a New Mom: Nutrition and Self-Care Tips",
        author: "Healthline Editorial Team",
        preview: "Practical advice for maintaining good nutrition and self-care while adjusting to life with a newborn...",
        url: "https://www.healthline.com/health/parenting/day-in-the-life-new-mom"
      }
    ]
  };

  const getArticlesForCategory = () => {
    return articlesByCategory[selectedCategory] || [];
  };

  return (
    <div className="flex flex-col w-full max-w-[402px] mx-auto bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">My Knowledge Crib</h1>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Welcome to your personalized Pregnancy Hub</h2>
          <p className="text-gray-600">Your holistic pregnancy resource</p>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="grid grid-cols-5 gap-2 p-4 w-full">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`flex flex-col items-center justify-start p-2 rounded-lg border transition-colors h-full
              ${selectedCategory === category.value 
                ? 'border-[#082154] bg-[#082154]/5' 
                : 'border-gray-200 bg-white'}`}
          >
            <span className="text-2xl mb-1">{category.emoji}</span>
            <span className="text-[10px] text-center leading-tight">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Articles Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">New Articles You May Enjoy</h2>
        <div className="space-y-4">
          {getArticlesForCategory().map((article, index) => (
            <Card 
              key={index} 
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => window.open(article.url, '_blank')}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 text-[#082154]">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.preview}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-full" />
                    <span className="text-sm text-gray-700">{article.author}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}; 