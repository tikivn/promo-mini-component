## Tini Mini Scratch Card

Bạn có thể làm game thẻ cào với component này

<img src="https://salt.tikicdn.com/ts/tiniapp/1c/a3/62/44f218a03060499e93163d64e4a31747.gif" width="300" />

#### Installation

```
yarn add @tiki.vn/tini-mini-scratch-card
```

## Usage

**json**

```json
{
  "usingComponents": {
    "scratch": "@tiki.vn/tini-mini-scratch-card/es/scratch/index"
  }
}
```

**txml**

```html
<scratch
  tipText="Cào ngay để nhận thưởng~"
  tipColor="#902d02"
  coverColor="#ffae8a"
  ctxLogoUrl="https://gw.alipayobjects.com/zos/rmsportal/iGLmHkSxYfXveGhuzzFf.png"
  resultText=""
  autoFadeOut="true"
  onFinish="onFinish"
>
  <view class="result">
    <text>{{result}}</text>
  </view>
</scratch>
```

**js**

```js
Page({
  data: {
    content: 'Demo',
    result: '',
  },
  onLoad(options) {
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
```

#### Config Options

| Tên thuộc tính | Kiểu dữ liệu | Giá trị mặc định            | Mô tả                                                                                                  |
| -------------- | ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| id             | String       | scratch-canvas              | id của component, không được trùng trong một tr                                                        |
| width          | Number       | 300                         | Chiều rộng của thẻ cào, đơn vị `px`                                                                    |
| height         | Number       | 150                         | Chiều cao của thẻ cào, đơn vị `px`                                                                     |
| tipText        | String       | Scratch me, have a surprise | Gợi ý trên thẻ cào                                                                                     |
| tipColor       | String       | #aaa                        | Màu chữ gợi ý                                                                                          |
| tipSize        | Number       | 20                          | Kích thước chữ của gợi ý, đơn vị `px`                                                                  |
| lineWidth      | Number       | 25                          | Chiều rộng của dòng, đơn vị `px`                                                                       |
| activePercent  | Number       | 0.4                         | Khi phạm vi xoá đạt đến tỉ lệ này thì sẽ kết thúc, giá trị từ `0-1`                                    |
| autoFadeOut    | Boolean      | true                        | Khi giá trị là `true` và tỷ lệ bị xóa đạt đến giá trị của `activePercent`, lớp cào sẽ tự động biến mất |
| ctxLogoUrl     | String       |                             | Hình nền của thẻ, nếu dùng cdn phải hỗ trợ `Access-Control-Allow-Origin: *`                            |
| coverColor     | String       | #dbdbdb                     | Màu nền của vùng cào, không để độ trong suốt là 0                                                      |
| resultText     | String       | 谢谢参与                    | Kết quả sau khi cào                                                                                    |
| onFinish       | Function     | ()=>{}                      | Sự kiện được gọi khi tỉ lệ bị xoá đạt đến giá trị của `activePercent`                                  |

> Các đơn vị được tính là px, không hỗ trợ `rpx` và `rem`
