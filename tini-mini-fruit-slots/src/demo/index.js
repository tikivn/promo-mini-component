Page({
  data: {
    prizeList: [
      {
        name: 'Cảm ơn bạn đã tham gia 1',
        icon: 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png',
      },
      {
        name: 'Phong bì đỏ 666',
        icon: 'https://zos.alipayobjects.com/rmsportal/nxpXbcNBOmbeIOVCUsuS.png',
      },
      {
        name: 'Phong bì đỏ 1',
        icon: 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png',
      },
      {
        name: 'Phong bì đỏ 3',
        icon: 'https://zos.alipayobjects.com/rmsportal/tyMAYvTdjRFOVxqWVhsj.png',
      },
      {
        name: 'Cảm ơn bạn đã tham gia  2',
        icon: 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png',
      },
      {
        name: 'Phong bì đỏ 1',
        icon: 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png',
      },
      {
        name: 'Cảm ơn bạn đã tham gia  3',
        icon: 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png',
      },
      {
        name: 'Phong bì đỏ 5',
        icon: 'https://zos.alipayobjects.com/rmsportal/qanDEFeGBoiPflYxkhJY.png',
      },
    ],
    prizeName: 'Phong bì đỏ 5',
    prizeName2: '',
    disabled: false,
    currentIndex: 2,
    tipText: '',
    tipText2: '',
  },
  onStart() {
    this.setData({
      tipText: 'Vòng quay xổ số...',
    });
  },
  onFinish(index, name) {
    this.setData({
      tipText: `Kết quả：${name}`,
    });
  },
  onStart2() {
    this.setData({
      tipText2: 'Vòng quay xổ số...',
      prizeName2: '', // Vì phần thưởng không chắc chắn ngay từ đầu nên nó cần được để trống.
    });
    // Bạn có thể call api để lấy kết quả
    setTimeout(() => {
      this.setData({
        prizeName2: 'Phong bì đỏ 3',
      });
    }, 3000);
  },
  onFinish2(index, name) {
    this.setData({
      tipText2: `Kết quả：${name}`,
    });
  },
});
