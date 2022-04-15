import React from 'react';
import HttpClient from '../../common/httpClient';
import config from '../../config/index';
import './app.css';

const CARDS = [
  { name: '精彩推荐', color: '#CBFF47', tag: '<script />' },
  { name: '精彩推荐', color: '#FFF347' },
  { name: '精彩推荐', color: '#47FFA0' },
  { name: '精彩推荐', color: '#AEECEF' },
  { name: '精彩推荐', color: '#F8E8B9' },
  { name: '精彩推荐', color: '#F8C7B9' },
];

function Home() {
  const cards = CARDS;

  HttpClient.request({
    url: `${config.REMOTE_SERVER}/home`,
    method: 'get',
    data: {},
    success: (res) => {
      console.log('res', res);
    },
    fail: () => {
      console.log('something went wrong');
    },
  });

  // var x, y, n = 0, ny = 0, rotINT, rotYINT
  // function rotateDIV() {
  //     x = document.getElementById("rotate1")
  //     clearInterval(rotINT)
  //     rotINT = setInterval("startRotate()", 10)
  // }
  // function rotateYDIV() {
  //     y = document.getElementById("rotatey1")
  //     clearInterval(rotYINT)
  //     rotYINT = setInterval("startYRotate()", 10)
  // }
  // function startRotate() {
  //     n = n + 1
  //     x.style.transform = "rotate(" + n + "deg)"
  //     x.style.webkitTransform = "rotate(" + n + "deg)"
  //     x.style.OTransform = "rotate(" + n + "deg)"
  //     x.style.MozTransform = "rotate(" + n + "deg)"
  //     if (n == 180 || n == 360) {
  //         clearInterval(rotINT)
  //         if (n == 360) { n = 0 }
  //     }
  // }
  // function startYRotate() {
  //     ny = ny + 1
  //     y.style.transform = "rotateY(" + ny + "deg)"
  //     y.style.webkitTransform = "rotateY(" + ny + "deg)"
  //     y.style.OTransform = "rotateY(" + ny + "deg)"
  //     y.style.MozTransform = "rotateY(" + ny + "deg)"
  //     if (ny == 180 || ny >= 360) {
  //         clearInterval(rotYINT)
  //         if (ny >= 360) { ny = 0 }
  //     }
  // }

  return (
    <div className="Home">
      <div className="Home-top">
        {cards.map(() => (
          <div className="Home-wrapper">
            <div className="Home-card">
              <div className="Home-card-front" />
              <div className="Home-card-back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
