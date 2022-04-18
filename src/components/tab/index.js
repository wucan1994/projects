import React, { useState } from 'react';
import TabBar from './tab-bar';
import TabPane from './tab-pane';
import './index.css';

export default function Tab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabList = [
    {
      title: '推荐',
      component: (
        <div>
          <span>love</span>
        </div>
      ),
    },
    {
      title: '关注',
      component: (
        <div>
          <span>follow</span>
        </div>
      ),
    },
    {
      title: '我的',
      component: (
        <div>
          <span>mycenter</span>
        </div>
      ),
    },
  ];

  const tabs = tabList.map((item) => item.title);

  const setActiveTab = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <TabBar tabs={tabs} onClickTab={setActiveTab} />
      <TabPane child={tabList[activeIndex].component} />
    </div>
  );
}
