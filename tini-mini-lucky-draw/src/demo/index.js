Page({
  data: {
    num: '0000',
  },
  onDrawTap() {
    this.setData({ num: Math.floor(1000 + Math.random() * 9000) });
  },
});
