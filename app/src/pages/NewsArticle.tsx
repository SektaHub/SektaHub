import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, {API_BASE_URL} from '../axiosConfig';
import ReactMarkdown from 'react-markdown';
import './NewsArticle.scss';

// Define interface for a single blog post
interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnailId: string;
  tags: string[]; // Updated to ensure tags is an array
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
          src={API_BASE_URL + "Image/" + article.thumbnailId + "/Content"}
          alt={article.title}
          style={{ maxHeight: '100px', width: 'auto' }} // Adjust dimensions as needed
        />
        <h1 style={{ marginLeft: '1rem' }}>{article.title}</h1>
      </div>

      {/* Render content as markdown using ReactMarkdown */}
      <ReactMarkdown className="markdown-body">{article.content}</ReactMarkdown>

      <div className="meta">
        <span>By {article.publisherName}</span> | <span>{new Date(article.dateCreated).toLocaleDateString()}</span>
      </div>

      <div className="tags">
        {/* Iterate over tags array directly */}
        {article.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsArticle;
