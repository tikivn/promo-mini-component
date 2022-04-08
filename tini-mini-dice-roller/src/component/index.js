import { watchPhoneShake } from './utils';

Component({
  data: {
    rollIndex: 0,
    rollSize: 4,
    isRolling: false,
  },
  props: {
    clickMode: false, // Shake mode is default, can change to click mode
    width: 300, // rollImg width
    height: 300, // rollImg height
    background: '#FFF',
    rollTime: 3000, // ms
    initImg:
      'https://salt.tikicdn.com/ts/miniapp/46/b3/08/fd8e28987044b07c20daeb328a83a5c5.png',
    awardImg: '',
    rollImg:
      'https://salt.tikicdn.com/ts/miniapp/cf/c7/6b/1eacdda81c7b570329cb9c8c5a385fa1.png',
    onStart: () => {},
    onFinish: () => {},
  },
  didMount() {
    this.ctx = my.createCanvasContext('canvas');
    const { rollTime, initImg, clickMode } = this.props;
    this.drawImage(initImg);
    if (!clickMode) {
      watchPhoneShake(() => {
        this.run();
        setTimeout(() => {
          this.stop();
        }, rollTime);
      });
    }
  },
  methods: {
    onStart() {
      if (this.data.isRolling) return;

      const { onStart, clickMode, rollTime } = this.props;
      if (onStart) {
        onStart();
      }
      if (clickMode) {
        this.run();
        setTimeout(() => {
          this.stop();
        }, rollTime);
      } else {
        watchPhoneShake(() => {
          this.run();
          setTimeout(() => {
            this.stop();
          }, rollTime);
        });
      }
    },
    run() {
      this.setData({
        isRolling: true,
      });
      this.interval = setInterval(this.draw.bind(this), 17);
    },
    stop() {
      clearInterval(this.interval);
      setTimeout(() => {
        this.drawImage(this.props.awardImg);
        this.setData({
          isRolling: false,
        });
        if (typeof this.props.onFinish) {
          this.props.onFinish();
        }
      }, 17);
    },
    drawImage(img) {
      if (!img) return;

      const { width, height, background } = this.props;
      const ctx = this.ctx;
      ctx.setFillStyle(background);
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
      ctx.draw();
    },
    draw() {
      const { width, height, rollImg, background } = this.props;
      const { rollIndex, rollSize } = this.data;
      const ctx = this.ctx;
      ctx.setFillStyle(background);
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(
        rollImg,
        0,
        height * rollIndex,
        width,
        height,
        0,
        0,
        width,
        height
      );
      ctx.draw();
      this.setData({
        rollIndex: rollIndex >= rollSize ? 0 : rollIndex + 1,
      });
    },
  },
});
