/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './index.css';

export default function TabBar(props) {
  const { tabs = [], onClickTab } = props;

  const clickTab = (index) => {
    onClickTab(index);
  };

  return (
    <div className="tab-bar">
      {tabs.map((item, index) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          key={item}
          onClick={() => clickTab(index)}
          className="tab-bar-item"
        >
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
