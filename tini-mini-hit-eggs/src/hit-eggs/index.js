Component({
  data: {
    list: [],
    hammerMace: false,
    isSmashing: false,
    activeIndex: -1,
    hammerPosX: 0,
    hammerPosY: 0,
    // State of egg
    STATE_BROKEN: 0,
    STATE_STILL: 1,
    STATE_JUMPING: 2,
    STATE_SMASHING: 3,
  },
  props: {
    eggsCount: 9,
    eggCol: 3,
    eggWidth: 80,
    hammerWidth: 100,
    eggMarginTop: 20,
    hammerOriginX: 0,
    hammerOriginY: 0,
    jumpingInterval: 600,
    smashingDuration: 1500,
    className: '',
    disabled: false,
    onStart: () => {},
    onFinish: () => {},
    hammerIcon:
      'https://salt.tikicdn.com/ts/miniapp/34/6f/81/a0351a51eb2e3c3a600bb0a488f70781.png',
    eggIcon:
      'https://salt.tikicdn.com/ts/miniapp/29/16/32/fe234f820e7b164a15710d2774385637.png',
    jumpIcon:
      'https://salt.tikicdn.com/ts/miniapp/3e/8a/e9/dccdc73b3dc97dead5003b794c39d780.png',
    redBagIcon:
      'https://salt.tikicdn.com/ts/miniapp/52/a0/42/44d8a4d9c4c45256510e4a70318176ac.png',
    smashedIcon:
      'https://salt.tikicdn.com/ts/miniapp/2e/3a/ae/a36759b4b2018ee0249c1563c8b9bba1.png',
  },
  didMount() {
    const list = [];
    for (let i = 0; i < this.props.eggsCount; i++) {
      list.push(1);
    }
    this.setData({ list: list });
    this.run();
  },
  didUpdate(prevProps) {
    if (this.props.disabled) {
      this.stop();
    } else if (prevProps.disabled) {
      this.run();
    }
  },

  methods: {
    run() {
      if (this.props.disabled) return;
      if (!this.hammerTimer) {
        this.eggsTimer = this.jumping(this.props.jumpingInterval);
        this.hammerTimer = this.maceAnim(400);
      }
    },
    jumping(ts) {
      return setInterval(() => {
        const list = this.data.list;
        const aIndex = this.data.activeIndex;
        let cIndex = (aIndex + 1) % list.length;
        for (let i = 0; i < list.length; i++) {
          if (list[cIndex] === 1) {
            list[cIndex] = this.data.STATE_JUMPING;
            list[aIndex] === this.data.STATE_JUMPING &&
              (list[aIndex] = this.data.STATE_STILL);
            this.setData({
              list: list,
              activeIndex: cIndex,
            });
            break;
          }
          cIndex = (cIndex + 1) % list.length;
        }
      }, ts);
    },
    onHiting(e) {
      !this.props.disabled && this.start();
    },
    maceMoving() {
      const index = this.data.activeIndex;
      const col = +this.props.eggCol;
      const eggWidth = +this.props.eggWidth;
      const hammerWidth = +this.props.hammerWidth;
      const marginTop = +this.props.eggMarginTop;

      const offsetX = 0.3 * (eggWidth - hammerWidth);
      const offsetY = 0.3 * (eggWidth - hammerWidth);
      const x = (col - 1 - (index % col)) * eggWidth + offsetX;
      const y = Math.floor(index / col) * (eggWidth + marginTop) + offsetY;
      this.setData({
        hammerPosX: x,
        hammerPosY: y,
      });
    },
    hammerHoming() {
      this.setData({
        hammerPosX: this.props.hammerOriginX,
        hammerPosY: this.props.hammerOriginY,
      });
    },
    maceAnim(ts) {
      return setInterval(() => {
        this.setData({
          hammerMace: !this.data.hammerMace,
        });
      }, ts);
    },
    smashing() {
      const list = this.data.list;
      const index = this.data.activeIndex;
      list[index] = this.data.STATE_SMASHING;
      this.setData({
        list: list,
      });
    },
    broken() {
      const index = this.data.activeIndex;
      this.data.list[index] = this.data.STATE_BROKEN;
      this.setData({
        list: this.data.list,
      });
    },
    clear() {
      clearInterval(this.eggsTimer);
      clearInterval(this.hammerTimer);
      this.hammerTimer = this.eggsTimer = null;
    },
    stop() {
      this.clear();
    },
    start() {
      this.clear();
      this.maceMoving();
      this.smashing();
      this.hammerTimer = this.maceAnim(80);
      this.setData({
        isSmashing: true,
      });
      setTimeout(() => {
        this.done();
      }, this.props.smashingDuration);
      this.props.onStart();
    },
    done() {
      this.broken();
      this.clear();
      this.hammerHoming();
      this.setData({
        isSmashing: false,
      });
      setTimeout(() => {
        this.run();
      }, 500);
      this.props.onFinish();
    },
  },
});
