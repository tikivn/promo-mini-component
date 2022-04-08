# Tini Mini Fruit Slots

Component hỗ trợ chơi game quay xổ số

## Install

### tnpm

```dash
yarn add @tiki.vn/tini-mini-fruit-slots
```

## Usage

### json

```json
{
  "usingComponents": {
    "fruit-slots": "@tiki.vn/tini-mini-fruit-slots/es/fruit-slots/index"
  }
}
```

### js

```js
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
```

### txml

```html
<view class="container">
  <fruit-slots
    prizeList="{{prizeList}}"
    prizeName="{{prizeName}}"
    disabled="{{disabled}}"
    currentIndex="{{currentIndex}}"
    onStart="onStart"
    onFinish="onFinish"
  />
  <view class="tip-text">{{tipText}}</view>
</view>
```

### API

| Tên thuộc tính | Kiểu dữ liệu | Giá trị mặc định    | Mô tả                                                                                                               |
| -------------- | ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| width          | Number       | 300                 | Chiều rộng của component, đơn vị `px`                                                                               |
| margin         | Number       | 20                  | Khoảng cách giữa các giải thưởng, đơn vị `px`                                                                       |
| prizeList      | Array        | []                  | Danh sách giải thưởng [bắt buộc], độ dài phải là `8` và phải bao gồm các trường `name` và `icon`                    |
| prizeName      | String       | ''                  | Tên của giải thưởng [bắt buộc]，bắt buộc phải nằm trong các trường `name` của `prizeList`                           |
| rollTimes      | Number       | 3                   | Số lượt【Không bắt buộc】                                                                                           |
| currentIndex   | Number       | 0                   | Vị trí bắt đầu quay【Không bắt buộc】                                                                               |
| speed          | Number       | 100                 | Tốc độ quay【Không bắt buộc】，đơn vị `ms`                                                                          |
| mode           | String       | 'pre'               | Chế độ quay，`pre` hoặc `realtime`                                                                                  |
| class          | String       | ''                  | Tên class【Không bắt buộc】                                                                                         |
| disabled       | Boolean      | false               | Cho phép bấm nút quay hay không【Không bắt buộc】                                                                   |
| onStart        | Function     | () => {}            | Sự kiện được gọi khi bắt đầu quay【Không bắt buộc】                                                                 |
| onFinish       | Function     | (index, name) => {} | Sự kiện được gọi sau khi quay xong【Không bắt buộc】, @params(index: vị trí của giải thưởng，name: tên giải thưởng) |

### Giới thiệu về mô tả chế độ xổ số

Chế độ mặc định = 'pre', phải có kết quả xổ số trước rồi thiết lập cho component, sau đó vòng quay xổ số mới bắt đầu.

Tuy nhiên, nếu quá trình lấy kết quả trước diễn ra lâu, người dùng có thể phải đợi một lúc để vòng quay bắt đầu sau khi bấm vào quay xổ số, và trải nghiệm không tốt lắm, do đó, chế độ thời gian thực realtime được khuyến khích trong các dự án thực tế.
