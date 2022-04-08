# Tini Lucky Draw

Tini lucky draw là component hỗ trợ chơi game quay số

<img src="https://salt.tikicdn.com/ts/miniapp/f1/3a/a7/05e5de967849b9dc2ff14eee0e0b407e.gif" width="300" />

## Install

```dash
yarn add @tiki.vn/tini-mini-lucky-draw
```

## Usage

### json

```json
{
  "usingComponents": {
    "lucky-draw": "@tiki.vn/tini-mini-lucky-draw/es/component/index"
  }
}
```

### js

```js
Page({
  data: {
    num: '0000',
  },
  onDrawTap() {
    // You can call API to generate the number
    this.setData({ num: Math.floor(1000 + Math.random() * 9000) });
  },
});
```

### txml

```html
<lucky-draw height="80" width="60" num="{{num}}" />

<button onTap="onDrawTap">Draw</button>
```

### API

| Tên thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả                          |
| -------------- | ------------ | ---------------- | ------------------------------ |
| num            | String       | 000000           | Giá trị của vòng quay          |
| length         | String       | 000000           | Giá trị của vòng quay          |
| height         | Number       | 50               | Chiều cao của vòng quay (px)   |
| width          | String       | 50               | Chiều rộng của vòng quay (px)  |
| delay          | Number       | 2                | Thời gian để quay xong (giây） |
| className      | String       |                  | Class name cho component       |
