# Tini Mini Hit Eggs

Component hỗ trợ chơi game đập trứng

<img src="https://salt.tikicdn.com/ts/miniapp/91/00/86/fe5b63ad478d678e0c09dcf392e639c8.gif" width="300" />

#### Installation

```
yarn add @tiki.vn/tini-mini-hit-eggs
```

#### Usage

- json

```json
{
  "usingComponents": {
    "hit-geggs": "@tiki.vn/tini-mini-hit-eggs/es/hit-geggs/index"
  }
}
```

- js

```js
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
```

- txml

```html
<view>
  <hit-geggs onStart="onStart" onFinish="onFinish" disabled="{{disabled}}" />
</view>
```

#### Config Options

| Tên thuộc tính   | Kiểu dữ liệu | Giá trị mặc định                                                                         | Mô tả                                                                      |
| ---------------- | ------------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| eggsCount        | Number       | 9                                                                                        | Số lượng trứng                                                             |
| eggCol           | Number       | 3                                                                                        | Số cột                                                                     |
| eggWidth         | Number       | 80                                                                                       | Kích thước quả trứng, đơn vị px                                            |
| hammerWidth      | Number       | 100                                                                                      | Kích thước búa đập, đơn vị px                                              |
| eggMarginTop     | Number       | 20                                                                                       | Khoảng cách các quả trứng                                                  |
| hammerOriginX    | Number       | 0                                                                                        | Vị trí của cây búa, tính từ góc trên bên phải, nếu > 0 sẽ dời qua bên trái |
| hammerOriginY    | Number       | 0                                                                                        | Vị trí của cây búa, tính từ góc trên bên phải, nếu > 0 sẽ dời xuống dưới   |
| jumpingInterval  | Number       | 600                                                                                      | Khoảng thời gian để quả trứng nhảy, đơn vị ms                              |
| smashingDuration | Number       | 1500                                                                                     | Khoảng thời gian để đập quả trứng, đơn vị ms                               |
| className        | String       | ''                                                                                       | Class cho component                                                        |
| disabled         | Boolean      | false                                                                                    | Không cho đập nếu disabled là true                                         |
| onStart          | Function     | (index) => {}                                                                            | Sự kiện được gọi khi bắt đầu đập trứng, có chứa index của quả trứng        |
| onFinish         | Function     | (index) => {}                                                                            | Sự kiện được gọi sau khi đập trứng, có chứa index của quả trứng            |
| hammerIcon       | String       | [src](https://salt.tikicdn.com/ts/miniapp/34/6f/81/a0351a51eb2e3c3a600bb0a488f70781.png) | Hình cây búa                                                               |
| eggIcon          | String       | [src](https://salt.tikicdn.com/ts/miniapp/29/16/32/fe234f820e7b164a15710d2774385637.png) | Hình quả trứng                                                             |
| jumpIcon         | String       | [src](https://salt.tikicdn.com/ts/miniapp/3e/8a/e9/dccdc73b3dc97dead5003b794c39d780.png) | Hình quả trứng khi nhảy lên                                                |
| redBagIcon       | String       | [src](https://salt.tikicdn.com/ts/miniapp/52/a0/42/44d8a4d9c4c45256510e4a70318176ac.png) | Hình quả trứng khi đang bị đập                                             |
| smashedIcon      | String       | [src](https://salt.tikicdn.com/ts/miniapp/2e/3a/ae/a36759b4b2018ee0249c1563c8b9bba1.png) | Hình quả trứng khi bị đập vỡ                                               |

#### API

- Khi bắt đầu chơi `disabled=true`
- Tạm dừng chơi `disabled=false`
- Bắt đầu đập trứng `onStart`
- Sau khi đập trứng `onFinish`
