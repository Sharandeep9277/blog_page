import Tag from "@/components/buttons/tag";

const TitleCreatedAtTag = ({ title, publishedAt, tags = [], activeTags = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/-/g, '.');
  };

  const isTagActive = (tag) => {
    return activeTags.includes(tag);
  };

  return (
    <div className="w-full max-w-[343px] sm:max-w-[720px] md:max-w-[1280px] px-[8px] md:px-[24px] lg:px-[109px] inline-flex flex-col justify-start items-start gap-[24px]"
    >
      
      <div className="self-stretch flex flex-col justify-start items-start gap-1"
      >
        <h1 className="self-stretch justify-start text-black text-[32px] md:text-[48px] font-bold font-['Noto_Sans_JP'] leading-[150%] tracking-[2]"
        >
          {title}
        </h1>
      </div>

      
      <div className="self-stretch inline-flex justify-start items-start md:items-center flex-col md:flex-row gap-[24px] md:gap-[24px] lg:gap-[48px]"
      >
       
        <div 
          className="justify-center text-[#737B8C] text-[16px] md:text-[20px] font-[16px] md:font-[20px] font-['Jost'] leading-loose"
        >
          {formatDate(publishedAt)}
        </div>

        
        <div 
          className="flex flex-row justify-start items-start gap-[4px] flex-wrap content-start"
        >
          {tags.map((tag, index) => (
            <Tag
              key={index}
              isActive={isTagActive(tag)}
              data-layer={`Frame ${3707 + index}`}
              data-property-1={isTagActive(tag) ? "ON" : "OFF"}
              className="h-5 px-4 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-gray-300 data-[property-1=ON]:outline-black flex justify-center items-center gap-1"
            >
              <span>
                {tag}
              </span>
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TitleCreatedAtTag;