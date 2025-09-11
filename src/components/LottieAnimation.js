'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

const LottieAnimation = ({ className = "" }) => {
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        
        const response = await fetch('https://lottie.host/fe9c26d0-d92b-4e9e-bd1b-32536f26f0e3/0baaTNVkdb.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimation();
  }, []);

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="animate-pulse bg-gray-200 w-full h-full rounded"></div>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded`}>
        <p className="text-gray-500">Failed to load animation</p>
      </div>
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      className={className}
    />
  );
};

export default LottieAnimation;