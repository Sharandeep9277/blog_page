'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function BlogSearchBar({ onSearch, placeholder = "キーワードを入力" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mx-auto w-full max-w-[343px] sm:max-w-[720px] lg:max-w-[753px]">
      <div className="w-full h-[50px] rounded-[8px] inline-flex justify-start items-center overflow-hidden" onSubmit={handleSubmit}>
        <div className="flex-1 self-stretch px-4 py-3 bg-stone-100 flex justify-start items-center overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            className={`w-full bg-transparent outline-none text-[16px] font-bold font-['Noto_Sans_JP'] leading-normal tracking-wide ${
              searchTerm ? 'text-black' : 'text-stone-300 placeholder-stone-300'
            }`}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`px-[16px] py-[10px] inline-flex justify-start items-center gap-2 overflow-hidden transition-colors duration-200 ${
            isHovering ? 'bg-rose-800 cursor-pointer' : 'bg-black'
          }`}
        >
          <span className="text-center justify-start text-white text-[20px] font-bold font-['Noto_Sans_JP'] leading-loose tracking-wide">
            検索
          </span>
          <Search className="w-[24px] h-[24px] text-white" />
        </button>
      </div>
    </div>
  );
}