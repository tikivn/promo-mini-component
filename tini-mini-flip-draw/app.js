App({
  onLaunch(options) {
    console.log("app onLaunch: options: ", options);

    my.request({
      url: 'https://dev.spj.vn/api/gas24h/category?token=',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      data: `q={ "token": "6015e47482e353d09b9363fea2fd3d52" }`,
      success: (s) => {
        console.log("s", s);
      },
      fail: (f) => {
        console.log("f", f);
      },
    });
  },
  onShow() {
    console.log("app onShow");
  },
  onHide() {
    console.log("app onHide");
  },
  onError(msg) {
    console.log("app OnError: ", msg);
  },
  globalData: "I am global data",
});
