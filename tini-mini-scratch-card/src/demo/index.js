Page({
  data: {
    content: 'Demo',
    result: '',
  },
  onLoad(options) {
    console.log('options', options);
    setTimeout(() => {
      this.setData({
        result: 'Chúc bạn may mắn lần sau ^^',
      });
    }, 1000);
  },
  onFinish() {
    console.log('Scratch is over');
  },
});
