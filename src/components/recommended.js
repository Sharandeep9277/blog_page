'use client';

import { useState, useEffect } from 'react';
import Title1 from './Title1';
import Card1 from './Card1';
import BlogCard from './blogCard';
import Button2 from './buttons/button2';
import { useRouter } from "next/navigation";

const RecommendedSection = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs?limit=4'); // Fetch 4 blogs
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setBlogs(data.data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    router.push(`/blogs/${blog.slug}`);
  };

  const handleMoreBlogsClick = () => {
    router.push('/blogs');
  };

  if (loading) {
    return (
      <div className="blogs-home">
        <Title1 
          title="ブログ"
          subtitle="BLOG"
          variant='light'
        />
        <div className="blogs-home-cards">
          <div>Loading blogs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogs-home">
        <Title1 
          title="ブログ"
          subtitle="BLOG"
          variant='light'
        />
        <div className="blogs-home-cards">
          <div>Error loading blogs: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="recommend-page">
      <div className='flex flex-col justify-center items-center'>
        <div className='text-black font-bold text-[24px] leading-[150%] tracking-[0.5]'>おすすめの記事</div>
      </div>
      
      <div className="blogs-home-cards">
        {blogs.map((blog) => (
          <BlogCard 
            key={blog.id} 
            post={blog}
            onClick={handleBlogClick}
          />
        ))}
      </div>

      <div className='more-blog-btn'>
        <Button2 onClick={handleMoreBlogsClick} />
      </div>
    </div>
  );
};

export default RecommendedSection;