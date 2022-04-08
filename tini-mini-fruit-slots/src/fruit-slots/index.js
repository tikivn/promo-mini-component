Component({
  data: {
    activeOrder: [0, 1, 2, 4, 7, 6, 5, 3], // The subscript order of the 8 squares except the button is clockwise from the upper left corner of the nine-square grid
    activeIndex: NaN,
    itemWidth: 0,
    isRolling: false,
  },
  props: {
    width: 300, // width, unit is px
    margin: 20, // Margin between awards, unit is px
    prizeList: [], // Prize list, max is 8
    prizeName: '', // Prize name
    rollTimes: 3, // Number of turns
    mode: 'pre', // Lottery mode: pre (default) | realtime
    currentIndex: 0, // Subscript at start of rotation
    speed: 100, // Rotational speed ms
    class: '', // Custom class name
    disabled: false, // Is the button clickable
    onStart: () => {}, // Start callback
    onFinish: () => {}, // Finish callback
  },
  didMount() {
    this.prizeLength = 8;
    // Must be rounded, otherwise there will be adaptation problems under some models
    this.setData({
      itemWidth: parseInt((this.props.width - 4 * this.props.margin) / 3),
    });
  },
  didUpdate(prevProps) {
    const { mode, prizeName } = this.props;
    if (mode === 'realtime' && prizeName && prevProps.prizeName !== prizeName) {
      const prizeIndex = this.findPrizeIndex(prizeName);
      if (prizeIndex === -1) {
        console.error(
          'Vui lòng điền đúng tên giải thưởng, giá trị của giải thưởng phải tồn tại trong trường tên Danh sách giải thưởng'
        );
        return;
      }
      // Tổng số bước quay = vòng quay mặc định x số giải thưởng + chỉ số vị trí kết thúc + số bước còn lại từ vị trí hiện tại đến cuối vòng
      const activeIndex = this.currentStep % this.prizeLength;
      this.totalSteps =
        1 * this.prizeLength +
        this.currentStep +
        (this.prizeLength - activeIndex) +
        prizeIndex;
    }
  },
  methods: {
    next(activeIndex) {
      activeIndex = activeIndex % this.prizeLength;
      this.setData({ activeIndex: this.data.activeOrder[activeIndex] });
      if (this.currentStep === this.totalSteps) {
        this.done(activeIndex);
        return;
      }
      this.currentStep += 1;
      setTimeout(() => {
        this.next(++activeIndex);
      }, this.speedCtl());
    },
    /**
       Simulate speed changes, divided into four gears
       When the number of grids walked < total steps - 2 grids, the speed is speed
       increase linearly with this
     */
    speedCtl() {
      const steps = this.totalSteps;
      const size = this.prizeLength;
      const currentStep = this.currentStep;
      if (currentStep < steps - size * 2) {
        return this.props.speed;
      } else if (
        steps - size * 2 <= currentStep &&
        currentStep <= steps - size
      ) {
        return this.props.speed * 2;
      } else if (steps - currentStep > 3) {
        return this.props.speed * 3;
      } else {
        return this.props.speed * 4;
      }
    },
    /**
       Get the corresponding subscript of the prize item in the clockwise grid by name
       not found returns -1
     */
    findPrizeIndex(name) {
      const prizeList = this.props.prizeList;
      const order = this.data.activeOrder;
      for (let i = 0; i < this.prizeLength; i++) {
        if (prizeList[order[i]].name === name) {
          return i;
        }
      }
      return -1;
    },
    start() {
      const { disabled, prizeList, currentIndex, prizeName, mode } = this.props;
      if (disabled || this.data.isRolling) return;
      this.currentStep = 0;
      if (prizeList.length !== 8) {
        console.error('PrizeList length is not 8');
      }
      const activeIndex = +currentIndex || 0;
      if (mode === 'realtime') {
        this.totalSteps = Infinity;
      } else {
        // subscripts for prizes
        const prizeIndex = this.findPrizeIndex(prizeName);
        if (prizeIndex === -1) {
          console.error(
            'Vui lòng điền đúng tên giải thưởng, giá trị của giải thưởng phải tồn tại trong trường tên Danh sách giải thưởng'
          );
        }
        // Tổng số bước quay = vòng quay mặc định x số giải thưởng + chỉ số vị trí kết thúc + số bước còn lại từ vị trí hiện tại đến cuối vòng
        this.totalSteps =
          this.props.rollTimes * this.prizeLength +
          prizeIndex +
          (this.prizeLength - activeIndex);
      }
      this.setData({ isRolling: true });
      this.next(activeIndex);
      this.props.onStart();
    },
    done(activeIndex) {
      // setTimeout prevents the user from clicking the lottery again when the parent component sets disabled=true after the lottery is over. At this time, disabled and isRolling
      // The status has not had time to update, the start function may be executed
      setTimeout(() => {
        this.setData({ isRolling: false });
      }, 50);
      this.props.onFinish(activeIndex, this.props.prizeName);
    },
  },
});
