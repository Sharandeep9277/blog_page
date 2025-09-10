'use client';

import Navbar from "@/components/Navbar";
import { useState, useEffect } from 'react';
import Title1 from "@/components/Title1";
import BlogCard from "@/components/blogCard";
import BlogSearchBar from "@/components/blogs/BlogSearchBar";
import Tag from "@/components/buttons/tag";
import FooterCta from "@/components/footerCTA";
import Footer from "@/components/footer";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', 'IT Consulting', 'Engineering', 'Branding', 'Design', 'Other'];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs?limit=15');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const blogsData = data.data || [];
        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search term and active tag
  useEffect(() => {
    let filtered = blogs;

    // Filter by tag first
    if (activeTag !== 'All') {
      filtered = filtered.filter(blog =>
        blog.tags?.some(tag => tag.toLowerCase() === activeTag.toLowerCase())
      );
    }

    // Then filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, activeTag, blogs]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const handleBlogClick = (blog) => {
    console.log('Blog clicked:', blog);
    // router.push(`/blog/${blog.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <Navbar/>
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <Navbar/>
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Navbar/>
      <div className="blogs-page">
        <Title1 
          title="ブログ"
          subtitle="BLOG"
          variant='light'
        />
        
        <div className="flex flex-col w-full items-center justify-center gap-[16px]">
        {/* Search Bar */}
        <div className="w-full h-[50px] px-4">
          <BlogSearchBar onSearch={handleSearch} />
        </div>
        
        {/* Tags Row - 16px gap below search bar */}
        <div className="w-full px-4 mt-4">
          <div className="mx-auto w-full max-w-[343px] sm:max-w-[720px] lg:max-w-[753px]">
            <div className="flex flex-wrap items-center justify-center gap-[8px]">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  isActive={activeTag === tag}
                  onClick={() => handleTagClick(tag)}
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        </div>
        
        <div className="blogs-page-cards">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard 
                key={blog.id} 
                post={blog}
                onClick={handleBlogClick}
              />
            ))
          ) : (
            <div className="w-full text-center py-8">
              <p className="text-gray-500">
                {searchTerm || activeTag !== 'All' 
                  ? '検索結果が見つかりませんでした。' 
                  : 'ブログがありません。'}
              </p>
            </div>
          )}
        </div>
      </div>
      <FooterCta/>
      <Footer/>
    </div>
  );
}