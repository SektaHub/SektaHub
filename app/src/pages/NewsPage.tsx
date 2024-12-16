import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, {API_BASE_URL} from '../axiosConfig';
import './NewsPage.scss';

// Define interface for blog post
interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnailId: string; // Add imageUrl property
  tags: string;
  publisherName: string;
  dateCreated: string;
}

const NewsPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get<BlogPost[]>('Blogpost');
        setBlogPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog posts');
        setLoading(false);
        console.error('Error fetching blog posts:', err);
      }
    };

    fetchBlogPosts();
  }, []);

  const handlePostClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  if (loading) return <div>Loading News...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="news-page">
      <h1>News:</h1>
      {blogPosts.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <div className="blog-posts-container">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="blog-post"
              onClick={() => handlePostClick(post.id)}
            >
              <img src={API_BASE_URL + "Image/" + post.thumbnailId + "/Content"} alt={post.title} />
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
