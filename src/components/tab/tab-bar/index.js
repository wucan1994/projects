/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './index.css';

export default function TabBar(props) {
  const { tabs = [], onClickTab } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const clickTab = (index) => {
    setActiveIndex(index);
    onClickTab(index);
  };

  return (
    <div className="tab-bar">
      {tabs.map((item, index) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          key={item}
          onClick={() => clickTab(index)}
          className={`tab-bar-item ${
            index === activeIndex ? 'tab-bar-item-active' : ''
          }`}
        >
          <div>
            <span>{item}</span>
          </div>
          {activeIndex === index ? (
            <div className="tab-bar-item-emphasize" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
