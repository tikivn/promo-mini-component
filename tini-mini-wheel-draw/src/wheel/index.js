Component({
  data: {
    degValue: 0, // rotation angle
    prizeWidth: 0, // width of prize image
    prizePaddingTop: 0, // padding top of prize
    itemTransformOrigin: '', // prize rotation origin
  },
  props: {
    width: 300, // width of canvas, px unit
    initDeg: 0, // initial rotation angle
    rotTimes: 1, // number of lucky draw chances
    prizeList: [], // list of prizes
    prizeName: '', // prize name
    prizeWidth: NaN, // prize width
    prizePaddingTop: NaN, // prize padding top
    bgImg: 'https://salt.tikicdn.com/ts/miniapp/5e/80/07/6d2ff9b02246e5761d96b48023ea3bb5.png', // background image
    btnImg: 'https://salt.tikicdn.com/ts/miniapp/b1/1f/53/3a3a4ffc6db4628add1df0823229183e.png', // button image
    onStart: () => {}, // start callback
    onFinish: () => {}, // finish callback
    onTimesUp: () => {}, // timeup callback
  },
  didMount () {
    const widthNum = this._getNum(this.props.width);
    const widthUnit = this._getUnit(this.props.width);
    const prizeWidth = this.props.prizeWidth;
    const paddingTop = this.props.prizePaddingTop;
    this.setData({
      degValue: this.props.initDeg,
      itemTransformOrigin: `transform-origin:50% ${0.5 * widthNum}${widthUnit};`,
      prizeWidth: isNaN(prizeWidth) ? this._calculatePrizeWidth() : prizeWidth,
      prizePaddingTop: isNaN(paddingTop) ? this._calculatePrizePaddingTop() : paddingTop,
    });
    this.count = 6; // number of prizes
    this.rotNum = 0; // the first time the lottery is drawn
    this.onRunning = false; // check draw is running or not
  },
  methods: {
    init () {},
    getIndexByName (name) {
      const list = this.props.prizeList;
      for (let i = 0; i < this.count; i ++) {
        if (list[i] && list[i].name === name) return i;
      }
      return -1;
    },
    start () {
      if (this.onRunning) return;
      if (this.rotNum >= this.props.rotTimes) {
        this.props.onTimesUp();
        return;
      };
      if (!this.props.prizeName) {
        throw new Error('Please enter the name of lottery result：prizeName');
      }
      const index = this.getIndexByName(this.props.prizeName);
      if (index === -1) {
        throw new Error(`The name of the lottery result does not match the configuration item of the lottery list, and the prize named ${this.props.prizeName} was not found`);
      }
      this.rotNum += 1;
      this.onRunning = true;
      const degree = (index + (index + 1)) * (360 / (this.count * 2));
      const degValue = 360 * this.count * this.rotNum - degree;
      this.setData({degValue});
      this.props.onStart(this.props.prizeName, this.rotNum);
      setTimeout(() => {
        this.done();
      }, 6000);
    },
    done () {
      this.onRunning = false;
      this.props.onFinish(this.props.prizeName, this.rotNum);
    },
    _getNum (s) { // get pixel value
      return parseFloat(s);
    },
    _getUnit (s) { // get unit
      s += '';
      return (s.match(/[a-z]+$/) || [])[0] || 'px';
    },
    _calculatePrizeWidth () {
      const widthNum = this._getNum(this.props.width);
      const widthUnit = this._getUnit(this.props.width);
      return (4 - 2 * Math.sqrt(3)) * 0.5 * widthNum + widthUnit;
    },
    _calculatePrizePaddingTop () {
      const widthNum = this._getNum(this.props.width);
      const widthUnit = this._getUnit(this.props.width);
      return 0.5 * widthNum - 0.25 * widthNum * Math.sqrt(3) + widthUnit;
    }
  }
})
