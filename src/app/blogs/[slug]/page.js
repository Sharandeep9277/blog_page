'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import FooterCta from "@/components/footerCTA";
import Footer from "@/components/footer";
import BlogContent from '@/components/blogs/blogContent';
import TitleCreatedAtTag from "@/components/blogs/h1Tag";
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import ButtonBlog from '@/components/buttons/buttonBlog1';
import RecommendedSection from '@/components/recommended';

export default function BlogPost() {
  const [blog, setBlog] = useState(null);
  const [navigation, setNavigation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        setBlog(data.blog || null);
        setNavigation(data.navigation || {});
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const handleBackToBlogs = () => {
    router.push('/blogs');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return '1';
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error === 'Blog post not found' ? 'ブログが見つかりません' : 'エラーが発生しました'}
            </h1>
            <p className="text-gray-600 mb-6">
              {error === 'Blog post not found' 
                ? '指定されたブログ記事は見つかりませんでした。' 
                : 'ブログの読み込み中にエラーが発生しました。'}
            </p>
            <button
              onClick={handleBackToBlogs}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ブログ一覧に戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className='flex flex-col justify-start items-center  gap-[96px] bg-[#F1F2F4] px-[16px] md:px-[24px] lg:px-[80px] pt-[48px] pb-[160px] '>
        <div className='flex flex-col justify-start items-center gap-[64px] '>
            <div className='py-[96px] bg-white rounded-[16px] flex flex-col justify-start items-center gap-[48px]'>
                <div className='flex flex-col justify-start items-start gap-[64px]'>
                    <TitleCreatedAtTag title={blog.title} publishedAt={blog.createdAt} tags={['IT Consulting', 'Engineering', 'Branding', 'Design', 'Other']} activeTags={blog.tags}/>
                    <img  className="w-full h-[214.38px] md:h-[450px] lg:h-[800px] " src={blog.thumbnail} />
                </div>
                <div className="w-full ">
                    <BlogContent content={blog.content} />
                </div>
            </div>

            {/* Navigation Button */}
            <ButtonBlog navigation={navigation}/>
        </div>
        <RecommendedSection/>
      </div>
      <FooterCta />
      <Footer />


    </div>
  );
}