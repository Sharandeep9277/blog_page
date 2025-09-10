import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const ButtonBlog = ({ navigation }) => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between items-center max-w-4xl">
      {/* Previous Button */}
      <button
        onClick={() => router.push(`/blogs/${navigation.prev.slug}`)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 
          ${navigation.prev?.slug 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-gray-400 cursor-not-allowed'}`}
        disabled={!navigation.prev?.slug}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Home/All Blogs Button */}
      <button
        onClick={() => router.push('/blogs')}
        className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={() => router.push(`/blogs/${navigation.next.slug}`)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 
          ${navigation.next?.slug 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-gray-400 cursor-not-allowed'}`}
        disabled={!navigation.next?.slug}
      >
        <span>Next</span>
        <ArrowLeft className="w-4 h-4 rotate-180" />
      </button>
    </div>
  );
};

export default ButtonBlog;