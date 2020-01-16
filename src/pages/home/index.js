import React, { useState, useEffect } from 'react';
import HttpClient from '../../common/httpClient';
import { REMOTE_SERVER } from '../../config/index'; 
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

    HttpClient.request({
        method: 'get',
        url: `${REMOTE_SERVER}/home`,
        data: {},
        success: res => {
            console.log('res', res);
        },
        fail: () => {
            console.log('something went wrong');
        }
    });

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