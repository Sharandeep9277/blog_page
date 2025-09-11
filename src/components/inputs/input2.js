
import { useState } from 'react';

const Input2 = ({ 
  label = "お名前", 
  placeholder = "お名前をご入力ください",
  value = "",
  onChange = () => {},
  error = false,
  errorMessage = "入力が必要です",
  required = false
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full md:w-full lg:w-full inline-flex flex-col justify-start items-start gap-[8px] md:gap-[20px] ">
      {error ? (

        <div className="inline-flex justify-start items-end gap-[24px]">
          <div className="justify-start text-[#fc3407] text-[20px] sm:text-[24px] font-medium font-['Noto_Sans_JP']">
            {label}{required && '*'}
          </div>
          <div className="justify-start text-[#fc3407] text-[14px] sm:text-[16px] font-medium font-['Noto_Sans_JP']">
            {errorMessage}
          </div>
        </div>
      ) : (

        <div className="justify-start text-black text-[20px] md:text-[24px] font-medium font-['Noto_Sans_JP']">
          {label}{required && '*'}
        </div>
      )}
      
      <div className="self-stretch h-[160px] p-[16px] bg-white rounded-[8px] outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-between items-start">
        
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="flex-1 bg-transparent text-black text-[16px] md:text-[18px] font-medium font-['Noto_Sans_JP'] leading-tight md:leading-snug outline-none"
          placeholder={error ? "" : placeholder}
        />
        
        <div className="w-4 h-4 relative" />
      </div>
    </div>
  );
};

export default Input2;