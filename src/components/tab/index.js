import React, { useState } from 'react';
import TabBar from './tab-bar';
import TabPane from './tab-pane';
import './index.css';

export default function Tab(props) {
  const { tabList = [] } = props;
  const [activeIndex, setActiveIndex] = useState(0);
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
