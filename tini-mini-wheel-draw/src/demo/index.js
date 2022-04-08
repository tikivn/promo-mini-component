Page({
  data: {
    prizeList: [
      {
        name: '1st prize',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/nIQUKeYBbJWliGJVhVmx.png',
      },
      {
        name: '2nd prize',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/HkrVjjjuxZPUMCUbPazb.png',
      },
      {
        name: '3rd prize',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/cDctUxwBLPCszQHRapYV.png',
      },
      {
        name: '4th prize',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/FAmIWZAWpUwlRFKqQDLz.png',
      },
      {
        name: '5th prize',
        img: 'https://gw.alipayobjects.com/zos/rmsportal/cuGomeXzMyeeZMjvVjBj.png',
      },
      {
        name: '6th prize',
        img: 'https://zos.alipayobjects.com/rmsportal/dwhgPyWAcXuvJAWlSSgU.png',
      },
    ],
    prizeName: '2nd prize',
    totalTimes: 2,
    curTimes: 0,
    result: '',
  },
  onStart(name, times) {
    console.log('onStart', name, 'The first' + times + 'Next chance');
    this.setData({
      result: `Please wait for the ${times} lucky draw...`,
      curTimes: times++,
    });
  },
  onFinish(name, times) {
    console.log('times', times);
    console.log('onFinish', name);
    this.setData({
      result:
        name === 'Not winning'
          ? 'Sorry, you almost won'
          : `Congratulations, get ${name}`,
      prizeName: this.data.prizeList[Math.floor(Math.random() * 6)].name,
    });
  },
  onTimesUp() {
    this.setData({
      result: `No more times`,
    });
  },
});
