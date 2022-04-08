## Tini Mini Lock

Component hỗ trợ làm màn hình khoá

<img src="https://salt.tikicdn.com/ts/tiniapp/04/29/0a/e282efe901a57d8f0acb5542dbf9675c.gif" width="300" />

#### Installation

```
yarn add @tiki.vn/tini-mini-lock
```

#### Usage

**json**

```
{
  "usingComponents": {
    "lock": "@tiki.vn/tini-mini-lock/es/lock/index"
  }
}
```

**txml**

```
<lock
  canvasWidth="300"
  canvasHeight="300"
  drawColor="#3985ff"
  canvasId="canvasLock"
  chooseType="3"
  titleColor="#000000"
  titleText="Draw the unlock pattern"
  onFinish="onFinish">
</lock>
```

**js**

```
onFinish() {
  console.log('do something')
}
```

#### Config Options

| Tên thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả                                                   |
| -------------- | ------------ | ---------------- | ------------------------------------------------------- |
| canvasWidth    | Number       | 300              | Chiều rộng của component, đơn vị `px`                   |
| canvasHeight   | Number       | 150              | Chiều cao của component，đơn vị `px`                    |
| canvasId       | String       | canvasLock       | Id cho component                                        |
| drawColor      | String       | #3985ff          | Màu của các đường tròn và đường vẽ                      |
| chooseType     | Number       | 3                | Số lượng các chấm tròn được vẽ trên mỗi hàng và mỗi cột |
| titleColor     | String       | #000000          | Màu của title                                           |
| titleText      | String       |                  | Tiêu đề                                                 |
| onFinish       | Function     | ()=>{}           | Hàm được gọi khi vẽ xong                                |
