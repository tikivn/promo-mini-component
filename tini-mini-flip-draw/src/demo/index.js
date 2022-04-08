Page({
  data: {
    prizeList: [
      {
        name: 'Giải nhất',
        icon: 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png',
      },
      {
        name: 'Giải nhì',
        icon: 'https://zos.alipayobjects.com/rmsportal/nxpXbcNBOmbeIOVCUsuS.png',
      },
      {
        name: 'Giải ba',
        icon: 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png',
      },
      {
        name: 'Giải tư',
        icon: 'https://zos.alipayobjects.com/rmsportal/tyMAYvTdjRFOVxqWVhsj.png',
      },
      {
        name: 'Giải năm',
        icon: 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png',
      },
      {
        name: 'Giải sáu',
        icon: 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png',
      },
      {
        name: '谢谢参与3',
        icon: 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png',
      },
      {
        name: '5元红包',
        icon: 'https://zos.alipayobjects.com/rmsportal/qanDEFeGBoiPflYxkhJY.png',
      },
    ],
    prizeName: '',
    flipAllCards3: false,
    flipAllCards6: false,
    flipAllCards9: false,
    isDrawing3: false,
    isDrawing6: false,
    isDrawing9: false,
    tipText3: 'Lật hình',
    tipText6: 'Lật hình',
    tipText9: 'Lật hình',
  },

  onFlipStart(x, muilt) {
    this.setData({
      [`tipText${x}`]: 'Đang lật...',
      [`isDrawing${x}`]: true,
    });
    // request
    setTimeout(() => {
      const prizeName = Math.random() > 0.5 ? 'Trúng rồi' : 'Trật rồi';
      this.setData({
        prizeName,
        [`tipText${x}`]: prizeName,
        [`isDrawing${x}`]: false,
      });
      // do something
      if (!muilt) {
        setTimeout(() => {
          this.setData({
            [`flipAllCards${x}`]: true,
          });
        }, 1000);
      }
    }, 1000);
  },

  onFlipStart3() {
    this.onFlipStart(3);
  },
  onFlipStart6() {
    this.onFlipStart(6);
  },
  onFlipStart9() {
    this.onFlipStart(9, true);
  },
});
