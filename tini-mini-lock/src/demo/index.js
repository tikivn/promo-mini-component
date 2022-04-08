import * as crypto from 'crypto-js';

Page({
  data: {
    content: 'demo',
    password: '',
  },
  onLoad(options) {
    console.log('demo onLoad, options: ', options);
  },
  onReady() {
    console.log('demo onReady');
  },
  onShow() {
    console.log('demo onShow');
  },
  onHide() {
    console.log('demo onHide');
  },
  onUnload() {
    console.log('demo onUnload');
  },
  onFinish(lastPoint) {
    const passcode = lastPoint
      .map(({ index }) => index)
      .join('');

    const password = crypto.MD5(passcode).toString();
    this.setData({ password });
    console.log(password);
  }
});
