import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const ButtonBlog = ({ navigation }) => {
  const router = useRouter();

  const buttonStyle = {
    '--hover-color': 'var(--color-red-bright)'
  };

  return (
    <div className="inline-flex justify-center items-center gap-[64px]">
      {/* Previous Button */}
      <button
        onClick={() => navigation.prev?.slug && router.push(`/blogs/${navigation.prev.slug}`)}
        className={`group inline-flex justify-start items-center gap-[24px]  ${
          navigation.prev?.slug 
            ? 'cursor-pointer text-black hover:[color:var(--hover-color)]' 
            : 'cursor-not-allowed text-gray-400'
        }`}
        style={navigation.prev?.slug ? buttonStyle : {}}
        disabled={!navigation.prev?.slug}
      >
        <div className="w-[12px] h-[24px] flex justify-center items-center ">
          <Icon 
            icon="weui:arrow-filled" 
            className={`w-full h-full rotate-180  ${
              navigation.prev?.slug ? 'text-[var(--color-willeder-red)] group-hover:[color:var(--hover-color)] ' : ''
            }`}
          />
        </div>
        <div className={`text-center justify-start text-[16px] font-medium font-['Jost'] leading-[150%] tracking-[0.5] ${
          navigation.prev?.slug ? ' group-hover:[color:var(--hover-color)]' : ''
        }`}>
          Prev
        </div>
      </button>

      {/* All Blogs Button */}
      <button
        onClick={() => router.push('/blogs')}
        className="group w-[32px] h-[32px] flex justify-start items-center overflow-hidden text-black hover:[color:var(--hover-color)] cursor-pointer"
        style={buttonStyle}
      >
        <Icon icon="mdi:apps" className="w-[32px] h-[32px] text-[var(--color-willeder-red)] group-hover:[color:var(--hover-color)]" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => navigation.next?.slug && router.push(`/blogs/${navigation.next.slug}`)}
        className={`group inline-flex justify-start items-center gap-[24px] ${
          navigation.next?.slug 
            ? 'cursor-pointer text-black hover:[color:var(--hover-color)]' 
            : 'cursor-not-allowed text-gray-400'
        }`}
        style={navigation.next?.slug ? buttonStyle : {}}
        disabled={!navigation.next?.slug}
      >
        <div className={`text-center justify-start text-[16px] font-medium font-['Jost'] leading-[150%] tracking-[0.5] ${
          navigation.next?.slug ? 'group-hover:[color:var(--hover-color)]' : ''
        }`}>
          Next
        </div>
        <div className="w-[12px] h-[24px] flex justify-center items-center"> 
          <Icon 
            icon="weui:arrow-filled" 
            className={`w-full h-full  ${
              navigation.next?.slug ? 'text-[var(--color-willeder-red)] group-hover:[color:var(--hover-color)]' : ''
            }`}
          />
        </div>
      </button>
    </div>
  );
};

export default ButtonBlog;