# Tini Dice Roller

Tini Dice Roller hỗ trợ bạn chơi game đổ xúc xắc

<img src="https://salt.tikicdn.com/ts/miniapp/37/75/a6/61c4f35679b87ac6a36a34824deca3fa.gif" width="300" />

## Install

```dash
yarn add @tiki.vn/tini-mini-dice-roller
```

## Usage

### json

```json
{
  "usingComponents": {
    "diceroller": "@tiki.vn/tini-mini-dice-roller/es/component/index"
  }
}
```

### js

```js
Page({
  data: {
    awardImg: '',
    awardName: '',
    tipText: '',
  },
  onStart() {
    this.setData({
      tipText: 'Lottery draw...',
    });
    setTimeout(() => {
      this.setData({
        awardImg:
          'https://salt.tikicdn.com/ts/miniapp/46/b3/08/1d7f60744f1de44a6d027a8503c9020c.png',
        awardName: '1st Price',
      });
    }, 2000);
  },
  onFinish() {
    this.setData({
      tipText: `Lottery result：${this.data.awardName}`,
    });
  },
});
```

### txml

```html
<view class="container">
  <diceroller
    clickMode="true"
    awardImg="{{awardImg}}"
    onStart="onStart"
    onFinish="onFinish"
  >
    <view slot="button">Shake</view>
  </diceroller>
  <view class="tip-text">{{tipText}}</view>
</view>
```

### API

| Tên thuộc tính | Kiểu dữ liệu | Giá trị mặc định                                                                             | Mô tả                              |
| -------------- | ------------ | -------------------------------------------------------------------------------------------- | ---------------------------------- |
| width          | Number       | 300                                                                                          | Chiểu rộng của component (px)      |
| height         | Number       | 300                                                                                          | Chiều cao của component (px)       |
| background     | String       | #FFF                                                                                         | Hình nền của component             |
| rollTime       | Number       | 3000                                                                                         | Thời gian quay xúc xắc             |
| rollImg        | String       | [Xem thử](https://salt.tikicdn.com/ts/miniapp/46/b3/08/fd8e28987044b07c20daeb328a83a5c5.png) | Hình kết quả quay trúng            |
| initImg        | String       | [Xem thử](https://salt.tikicdn.com/ts/miniapp/cf/c7/6b/1eacdda81c7b570329cb9c8c5a385fa1.png) | Hình của xúc xắc                   |
| onStart        | Func         | -                                                                                            | Sự kiện được gọi khi bắt đầu quay  |
| onFinish       | Func         | -                                                                                            | Sự kiện được gọi khi kết thúc quay |
