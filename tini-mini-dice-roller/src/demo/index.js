import { toast } from '../component/utils'

Page({
  data: {
    awardImg: '',
    awardName: '',
    tipText: '',
  },
  onStart() {
    toast('Start shaking')
    this.setData({
      tipText: 'Lottery draw...'
    });
    setTimeout(() => {
      this.setData({
        awardImg: 'https://salt.tikicdn.com/ts/miniapp/46/b3/08/1d7f60744f1de44a6d027a8503c9020c.png',
        awardName: '1st Price'
      })
    }, 2000);
  },
  onFinish() {
    toast('Shake it up')
    this.setData({
      tipText: `Lottery result：${this.data.awardName}`
    });
  }
});
