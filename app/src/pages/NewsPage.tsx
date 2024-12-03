import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';

// Define interface for blog post
interface BlogPost {
  id: number;
  title: string;
  content: string;
}

const NewsPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading blog posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="news-page">
      <h1>Blog Posts</h1>
      {blogPosts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <div className="blog-posts-container">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;