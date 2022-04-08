# Tini Mini Flip Draw

Tini Mini Flip Draw giúp bạn làm các game lật hình

<img src="https://salt.tikicdn.com/ts/miniapp/33/be/ba/b8814b7067fd2c636c546f6b45806bc8.gif" width="300" />

## Install

```dash
yarn add @tiki.vn/tini-mini-flip-draw
```

## Usage

### json

```json
{
  "usingComponents": {
    "flipdraw": "@tiki.vn/tini-mini-flip-draw/es/component/index"
  }
}
```

### js

```js
Page({
  data: {
    prizeList: [{
      'name': 'Cảm ơn bạn đã tham gia',
      'icon': 'https://salt.tikicdn.com/ts/miniapp/f6/18/4e/5301f6d9d85fe91ee3aec42ccfdb5337.jpeg'
    }, ... ],
    prizeName: '',
    flipAllCards: false,
    isDrawing: false,
  },
  onFlipStart() {
    this.setData({
      isDrawing: true,
    });
    drawRequest().then(res => {
      if (res.success) {
        this.setData({
          prizeName: 'Trúng rồi',
          isDrawing: false,
        });
      } else {
        this.setData({
          isDrawing: false,
        });
      }
      this.showResultDialog()
    });
  }
});
```

### txml

```html
<view>
  <flipdraw
    prizeList="{{prizeList}}"
    prizeName="{{prizeName}}"
    isDrawing="{{isDrawing}}"
    flipAllCards="{{flipAllCards}}"
    onFlipStart="onFlipStart"
  />
</view>
```

## API

| Tên thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả                                                             |
| -------------- | ------------ | ---------------- | ----------------------------------------------------------------- |
| prizeList      | Array        | []               |                                                                   |
| prizeName      | String       | ''               | Danh sách các giải thưởng, là một mảng object có `name` và `icon` |
| cardNum        | Number       | 9                | Số lượng thẻ hiển thị, nên nằm trong các giá trị 3/6/9            |
| cardHeight     | Number       | 80               | Chiều cao của hình, đơn vị là px                                  |
| cardBgImg      | String       | -                | Hình thẻ khi lật                                                  |
| unawardImg     | String       | -                | Hình thẻ khi không chiến thắng                                    |
| isDrawing      | Boolean      | -                | Có đang lật hay không                                             |
| flipAllCards   | Boolean      | -                | Có cho phép lật hết các thẻ hay không                             |
| onFlipStart    | Function     | () => {}         | Sự kiệnn được gọi khi bắt đầu lật thẻ                             |
