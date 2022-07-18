import React, { Component } from 'react';
import Joyride from 'react-joyride';

export default class Tour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          target: '.step-1',
          content: 'Hello~ 本網站目的為幫助情緒低落的人群，希望憂鬱的時候這些可愛的動物能幫助緩解情緒，這裡每天會有一句正能量的話，願大家都能開心的生活<3',
          // 訊息欄位置
          placement: 'bottom',
          // 鼠標
          placementBeacon: 'top',

        },
        {
          target: '.step-2',
          content: '從這裡進去 可以製作＂夢想版＂，＂今日目標＂以及 ＂感恩小語＂，培養積極正向的想法',
          placement: 'left',
        },
        {
          target: '.step-3',
          // eslint-disable-next-line quotes, no-irregular-whitespace
          content: `點擊進入 可以選擇＂心情測驗＂或＂抽卡放鬆＂的活動!`,
          placement: 'left',
        },
        {
          target: '.step-4',
          content: '開心的時候和鸚鵡分享你的喜悅，喜悅會滋養一株花',
          placement: 'left',
        },
        {
          target: '.step-5',
          content: '把難過、傷心、煩惱的心事都告訴貓頭鷹吧~她會幫忙保守秘密，而每則心事會長成一株小草',
          placement: 'left',
        },
        {
          target: '.step-6',
          content: '到草坪查看已發佈的文章吧~關於你的心情紀錄都收藏在這裡',
          placement: 'right',
        },
        {
          target: '.step-7',
          content: '立即註冊，開始和動物們一起進行森林之旅吧！',
          placement: 'right',
        },
      ],
      showSkipButton: true,
      showProgress: true,
      continuous: true,
      tourActive: true,
    };
  }

  render() {
    const {
      steps, showSkipButton, showProgress, continuous, tourActive,
    } = this.state;

    return (
      <div className="app">
        <Joyride
          steps={steps}
          showSkipButton={showSkipButton}
          showProgress={showProgress}
          continuous={continuous}
          tourActive={tourActive}
          styles={{
            options: {
              arrowColor: '#e3ffeb',
              backgroundColor: '#e3ffeb',
              overlayColor: 'rgba(0, 26, 0, 0.4)',
              primaryColor: 'Green',
              textColor: '#004a14',
              width: 300,
              zIndex: 1000,
            },
          }}
        />
      </div>
    );
  }
}
