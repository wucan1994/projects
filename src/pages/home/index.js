import React from 'react';
import './index.css';

const CARDS = [
    { name: '精彩推荐', color: '#CBFF47' },
    { name: '精彩推荐', color: '#FFF347' },
    { name: '精彩推荐', color: '#47FFA0' },
    { name: '精彩推荐', color: '#AEECEF' },
    { name: '精彩推荐', color: '#F8E8B9' },
    { name: '精彩推荐', color: '#F8C7B9' }
]

function Home() {
    const cards = CARDS;
    return (
        <div className="Home">
            {
                cards.map(item => {
                    return (
                        <div className="Home-wrapper">
                            <div className="Home-card" style={{backgroundColor: item.color}}>{item.name}</div>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Home;