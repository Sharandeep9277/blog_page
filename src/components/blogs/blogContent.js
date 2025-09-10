import Image from 'next/image';
import React from 'react';

const BlogContent = ({ content }) => {
  const createMarkup = (html) => {
    return { __dangerouslySetInnerHTML: { __html: html } };
  };

  const processContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    return Array.from(doc.body.children).map((element, index) => {
      switch (element.tagName.toLowerCase()) {
        case 'h2':
          return (
            <div
                key={index}
                className="w-[295px] md:w-full pt-[96px] gap-[8px] md:gap-[24px] flex flex-row justify-start items-start"
                >
                {/* rectangle */}
                <div className="w-full max-w-[8px] self-stretch bg-red-800" />

                {/* content */}
                <h2 className="text-[24px] md:text-[32px] font-bold text-black leading-[150%] tracking-[0.5]">
                    {element.textContent}
                </h2>
            </div>

          );
        
        case 'h3':
          return (
            <div key={index} className='w-full flex flex-col justify-start items-start gap-[10px] pt-[48px] '>
            <h3 key={index} className="text-[20px] md:text-[24px] font-bold text-[#AD002D]">
              {element.textContent}
            </h3>
            </div>
          );
        
        case 'p':
          return (
            <div key={index}  className='w-full flex flex-col justify-start items-start gap-[10px] pt-[32px] '>
            <p className="text-black text-[16px] leading-[150%]">
              {element.textContent}
            </p>
            </div>
          );

        case 'small':
          return (
            <div key={index} className='flex flex-col gap-[10px] pt-[24px] justify-start items-start  ' >
            <small className="text-[14px] font-medium text-black leading-[150%] ">
              {element.textContent}
            </small>
            </div>
          );
        
        case 'blockquote':
          return (
            <div key={index} className='w-full flex flex-col justify-start items-start gap-[10px] pt-[32px] '>
                <div className="w-full flex flex-wrap p-[24px] bg-[#F1F2F4] rounded-[8px]">
                    <blockquote key={index} className="text-left text-[14px] font-medium text-black leading-[150%] ">
                    {element.textContent}
                    </blockquote>
                </div>
            </div>
          );
        
        case 'img':
          return (
            <div key={index} className="flex flex-col items-start justify-start pt-[32px]">
              <Image
                width={700}
                height={400}
                src={element.src}
                alt={element.alt}
                className="w-full rounded-[16px] "
              />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="w-full px-[8px] md:px-[24px] lg:px-[217px]">
      {content ? processContent(content) : null}
    </div>
  );
};

export default BlogContent;