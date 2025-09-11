import { useState } from 'react';

export default function CheckboxText({ 
  checked, 
  onChange, 
  className = '',
  error = false,
  errorMessage = "プライバシーポリシーに同意してください"
}) {
  return (
    <div className={`flex flex-col justify-start items-start gap-[8px] ${className}`}>
      <div className="flex justify-start items-center gap-[16px]">
        
        <div 
          className="relative flex-shrink-0 cursor-pointer"
          onClick={() => onChange(!checked)}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <div 
            className={`w-[24px] md:w-[30px] h-[24px] md:h-[30px] border-2 rounded-sm transition-all duration-200 ${
              error && !checked
                ? 'bg-white border-[#fc3407] hover:border-[#fc3407]'
                : checked 
                  ? 'bg-[#AD002D] border-[#AD002D]' 
                  : 'bg-white border-gray-300 hover:border-gray-400'
            }`}
          >
            {checked && (
              <svg 
                className="w-full h-full text-white p-0.5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </div>
        </div>

        
        <label 
          className={`text-[16px] md:text-[24px] leading-[125%] cursor-pointer select-none ${
            error && !checked ? 'text-[#fc3407]' : 'text-gray-800'
          }`}
          onClick={() => onChange(!checked)}
        >
          <span className="underline">プライバシー</span>ポリシー
        </label>
      </div>

      
      {error && !checked && (
        <div className="text-[#fc3407] text-[14px] md:text-[16px] font-medium font-['Noto_Sans_JP'] ml-[40px] md:ml-[46px]">
          {errorMessage}
        </div>
      )}
    </div>
  );
}