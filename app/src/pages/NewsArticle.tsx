import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axiosConfig';
import ReactMarkdown from 'react-markdown';  // Import react-markdown
import './NewsArticle.scss';

// Define interface for a single blog post
interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  tags: string;
  publisherName: string;
  dateCreated: string;
}

const NewsArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from route params
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await api.get<BlogPost>(`Blogpost/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch the article');
        setLoading(false);
        console.error('Error fetching article:', err);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading Article...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>Article not found.</div>;

  return (
    <div className="news-article">
      <h1>{article.title}</h1>
      <img src={article.imageUrl || 'https://via.placeholder.com/600'} alt={article.title} />
      
      {/* Render content as markdown using ReactMarkdown */}
      <ReactMarkdown>{article.content}</ReactMarkdown>
      
      <div className="meta">
        <span>By {article.publisherName}</span> | <span>{new Date(article.dateCreated).toLocaleDateString()}</span>
      </div>
      
      <div className="tags">
        {article.tags.split(',').map((tag) => (
          <span key={tag} className="tag">
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsArticle;
