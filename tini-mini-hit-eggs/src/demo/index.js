Page({
  data: {
    disabled: false,
    times: 0,
  },
  onStart(index) {
    this.setData({
      times: ++this.data.times,
    });
  },
  onFinish(index) {
    if (this.data.times >= 3) {
      this.setData({
        disabled: true,
      });
    }
  },
});
