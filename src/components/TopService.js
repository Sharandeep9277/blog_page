'use client';

import Title1 from './Title1';
import Card1 from './Card1';

const TopService = () => {
  return (
    <div className="top-service">
      <Title1 
        title="サービス内容"
        subtitle="SERVICE"
        variant='dark'
      />
      
      <div className="top-service-cards">
        <Card1
          iconSrc="/5e94442bf468a7e0af2e941beb3abasasddcc8958d8cd.webp"
          title="クリエイト"
          subtitle="高速PDCA"
          description="多数のクリエイティブを用意。トーナメント方式で広告クリエイティブを高速で比較・テスト。最も高いCV率を素早く見極め、効果的な広告運用を実現。"
        />
        <Card1
          iconSrc="/5e94442bf468a7e0af2e941beb3abdcc8958d8cd.webp"
          title="配信面"
          subtitle="高速PDCA"
          description="キャンペーンの再構築、配信チャネルの見直し、入札単価の調整などを迅速に行い、広告配信を最適化。"
        />
        <Card1
          iconSrc="/d5b6b5c3d3779505f17b9250823558cb87c433f2.webp"
          title="LPO"
          subtitle="高速PDCA"
          description="ヒートマップ等ユーザー動線を分析し、迅速にLPを修正。ページの精読率やクロール率を改善し、より高いCVを実現。"
        />
      </div>
    </div>
  );
};

export default TopService;