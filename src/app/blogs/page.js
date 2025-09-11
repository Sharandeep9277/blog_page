'use client';

import Navbar from "@/components/Navbar";
import { useState, useEffect } from 'react';
import Title1 from "@/components/Title1";
import BlogCard from "@/components/blogCard";
import BlogSearchBar from "@/components/blogs/BlogSearchBar";
import Tag from "@/components/buttons/tag";
import FooterCta from "@/components/footerCTA";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const router = useRouter();

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


  useEffect(() => {
    let filtered = blogs;


    if (activeTag !== 'All') {
      filtered = filtered.filter(blog =>
        blog.tags?.some(tag => tag.toLowerCase() === activeTag.toLowerCase())
      );
    }

    
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
    router.push(`/blogs/${blog.slug}`);
  };

  if (loading) {
    return (<LoadingScreen/>); 
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <Navbar
        menuItems={[
          { text: "TOP", href: "/", isSelected: false },
          { text: "ブログ", href: "/blogs", isSelected: true }
        ]}/>
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
        <Navbar
        menuItems={[
          { text: "TOP", href: "/", isSelected: false },
          { text: "ブログ", href: "/blogs", isSelected: true }
        ]}/>
      <div className="blogs-page">
        <Title1 
          title="ブログ"
          subtitle="BLOG"
          variant='light'
        />
        
        <div className="flex flex-col w-full items-center justify-center gap-[16px]">
        
        <div className="w-full h-[50px] px-4">
          <BlogSearchBar onSearch={handleSearch} />
        </div>
        
        
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