# Tini mini wheelx -draw

<img src="https://salt.tikicdn.com/ts/tiniapp/38/28/2e/fded8b2d988af796067a44cf1ff2fdc7.gif" width="300" />

## Turntable gameplay component usage

#### Installation

```code
yarn add @tiki.vn/tini-mini-wheel-draw
```

#### Usage

##### init

- json

```html
{ "usingComponents": { "wheel": "@tiki.vn/tini-mini-wheel-draw/es/wheel/index" }
}
```

- js

```js
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
```

- txml

```html
<wheel
  width="22em"
  prizeList="{{prizeList}}"
  prizeName="{{prizeName}}"
  rotTimes="{{totalTimes}}"
  onStart="onStart"
  onFinish="onFinish"
  onTimesUp="onTimesUp"
/>
<view class="times">
  <text>You have {{totalTimes - curTimes}} more chances to draw</text>
</view>

<view class="result">
  <text>{{result}}</text>
</view>
```

#### Config Options

| Tên thuộc tính  | Kiểu dữ liệu | Giá trị mặc định    | Mô tả                                                                                                                                                 |
| --------------- | ------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| width           | Number       | 300                 | Chiều rộng của component, đơn vị px                                                                                                                   |
| initDeg         | Number       | 0                   | Độ lệch góc quay khởi tạo bàn xoay, đơn vị reg                                                                                                        |
| rotTimes        | Number       | 1                   | Số cơ hội xổ số, khi số lần quay số lớn hơn giá trị này, không được rút thăm nữa                                                                      |
| prizeList       | Array        | []                  | Danh sách giải thưởng [Bắt buộc], độ dài là 6, mỗi mục phải có `img` (hình ảnh giải thưởng) và `name` (tên giải thưởng)）                             |
| prizeName       | String       | ''                  | Tên của giải thưởng chiến thắng [bắt buộc], giá trị cần tồn tại trong trường `name` của Danh sách giải thưởng                                         |
| prizeWidth      | Number       | 80                  | Chiều rộng của ảnh dự thưởng [tùy chọn], đơn vị mặc định là px, component sẽ tự động tính theo giá trị của tùy chọn chiều rộng                        |
| prizePaddingTop | Number       | 20                  | Lề trong của ảnh giải thưởng tính từ vòng cung [tùy chọn], đơn vị mặc định là px, component sẽ tự động tính toán theo giá trị của tùy chọn chiều rộng |
| bgImg           | String       | 背景图片 src        | Hình nền của vòng quay                                                                                                                                |
| btnImg          | String       | 按钮图片 src        | Hình nền của nút bấm quay                                                                                                                             |
| onStart         | Function     | (name, times) => {} | Sự kiện được gọi khi bắt đầu quay，name：tên của giải thưởng，times：số lần quay                                                                      |
| onFinish        | Function     | (name, times) => {} | Sự kiện được gọi sau khi quay xong，name：tên của giải thưởng，times：số lần quay                                                                     |
| onTimesUp       | Function     | () => {}            | Sau khi quay xong, nhấn vào quay lần nữa nếu đã hết lượt thì sự kiện sẽ được gọi                                                                      |
