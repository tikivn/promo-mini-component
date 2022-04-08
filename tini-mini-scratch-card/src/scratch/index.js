Component({
  data: {
    pr: 1,
    scraping: true, // scratching the prize
    animationClass: ''
  },
  props: {
    id: 'scratch-canvas',
    width: 300, // width px
    height: 150, // height px
    tipText: 'Scratch me, have a surprise', // tip text
    tipColor: '#aaa', // tip color
    tipSize: 20, // tip size px
    lineWidth: 25, // line width
    activePercent: 0.4, // After erasing a certain proportion of the area, the background will disappear automatically, the value is decimal, 0-1
    autoFadeOut: true, // Whether to enable the background to automatically disappear
    coverColor: '#dbdbdb', // background color
    resultText: 'Thank you for participation', // lottery result text
    onFinish: () => {} // The lottery end callback, triggered when the erasure ratio reaches activePercent
  },
  didMount () {
    const pr = 1;
    this.ctx = my.createCanvasContext('scratch-canvas');
    this.draw(); // 
    this.area = pr * this.props.width * pr * this.props.height; // canvas area
    this.clearPercent = 0; // The percentage of canvas area of all selections with cleared pixels
  },

  methods: {
    onTouchStart (e) {
      if (e.touches && e.touches[0]) {
        const point = e.touches[0];
        this.lastPoint = point;
      }
    },
    onTouchMove (e) {
      console.log('e :>> ', e);
      const point = (e.changedTouches || e.touches || [])[0];
      if (point) {
        this.refresh(point);
        this.lastPoint = point;
      }
    },
    onTouchEnd (e) {
      if (!this.data.scraping) return;
      const point = (e.changedTouches || e.touches || [])[0];
      
      if (!point) {
        this.onFinish();
        this.setData({ scraping: false });
        this.props.autoFadeOut && this.fadeOut();
      }

      this.lastPoint = null;
      if (this.clearPercent > this.props.activePercent) {
        this.onFinish();
        this.setData({ scraping: false });
        this.props.autoFadeOut && this.fadeOut();
      }
    },
    draw () {
      const ctx = this.ctx;
      const props = this.props;
      const pr = this.data.pr;
      ctx.fillStyle = props.coverColor;
      ctx.fillRect(0, 0, props.width * pr, props.height * pr);
      if (props.ctxLogoUrl) {
        ctx.drawImage(props.ctxLogoUrl, 0, 0, props.width * pr, props.height * pr);
      }
      ctx.font = props.tipSize + 'px Courier New';
      ctx.fillStyle = props.tipColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(props.tipText, props.width * pr / 2, props.height * pr / 2);
      ctx.strokeStyle = 'white';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = props.lineWidth;
      ctx.draw();
    },
    refresh (point = {}) {
      /*
        The applet canvas does not support the globalCompositeOperation property
        this.ctx.globalCompositeOperation = "destination-out"; // invalid
        Therefore, it is very hacky to connect the beginning and end points of the screen to form a thick line selection, and then realize the clearing of the selection pixels by yourself.
      */
      const pr = this.data.pr;
      const ctx = this.ctx;
      const props = this.props;
      const r = props.lineWidth / 2;
      const x1 = this.lastPoint.clientX;
      const y1 = this.lastPoint.clientY;
      const x2 = point.clientX;
      const y2 = point.clientY;

      // (x1, y1), (x2, y2) are the two endpoints of the start and end of the line respectively, that is, the center of the arc at both ends of the thick line. The length of the rectangle is the length of the line that the finger moves, and the height is the width of the line.
      // Get the four endpoints of the clipping area between the two points, that is, the vertices of the rectangle border (x3, y3)..(x6, y6)
      const asin = r * Math.sin(Math.atan((y2 - y1) / (x2 - x1)));
      const acos = r * Math.cos(Math.atan((y2 - y1) / (x2 - x1)));
      const x3 = x1 + asin;
      const y3 = y1 - acos;
      const x4 = x1 - asin;
      const y4 = y1 + acos;
      const x5 = x2 + asin;
      const y5 = y2 - acos;
      const x6 = x2 - asin;
      const y6 = y2 + acos;

      // Ensure the coherence of the lines, so draw circles at both ends of the rectangle
      ctx.save();
      ctx.beginPath();
      ctx.arc(x1, y1, r, 0, 2 * Math.PI);
      ctx.arc(x2, y2, r, 0, 2 * Math.PI);
      ctx.clip();
      ctx.clearRect(0, 0, props.width * pr, props.height * pr);
      ctx.restore();

      // clear the pixels in the rectangle clipping area
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x3, y3);
      ctx.lineTo(x5, y5);
      ctx.lineTo(x6, y6);
      ctx.lineTo(x4, y4);
      ctx.closePath();
      ctx.clip();
      ctx.clearRect(0, 0, props.width * pr, props.height * pr);
      ctx.restore();

      // clear line pixel scheme 2
      // In the applet, when the sliding is very fast, it will cause the page rendering to crash and a white screen
      // this._clearCircle(point, r);
      // if (this.lastPoint) {
      //     let posX = point.x - this.lastPoint.x;
      //     let posY = point.y - this.lastPoint.y;
      //     let posXY = Math.abs(posX) + Math.abs(posY);
      //     while(posXY > 6) {
      //         Math.abs(posX) > 3 && (posX += (posX < 0 ? 3 : -3));
      //         Math.abs(posY) > 3 && (posY += (posY < 0 ? 3 : -3));
      //         this._clearCircle({x: point.x - posX, y: point.y - posY}, r);
      //         console.log(this.lastPoint, point, {x: point.x - posX, y: point.y - posY}, posX, posY)
      //         posXY = Math.abs(posX) + Math.abs(posY);
      //     }
      // }
      ctx.draw(true);
      this.calculateClearPercent(x1, y1, x2, y2);
    },
    // BUG: Due to the limitation of the getImageData interface, the proportion of the scratched area cannot be really obtained (the calculation is repeated when the blank area is repeatedly scratched, which cannot be judged at present)
    calculateClearPercent (x1, y1, x2, y2) {
      const lx = x2 - x1;
      const ly = y2 - y1;
      const l = Math.sqrt(lx * lx + ly * ly);
      this.clearPercent += (l * this.props.lineWidth) / this.area;
    },
    fadeOut () {
      this.setData({
        animationClass: 'fade-out',
      });
    },
    onFinish () {
      this.props.onFinish();
    }
    // _clearCircle(point, r) {
    //     const r2 = r * r;
    //     for (let x = 0; x <= r; x++) {
    //         for (let y =0; y <= r; y++) {
    //             if (x*x + y*y <= r2) {
    //                 this.ctx.clearRect(point.x + x, point.y + y, 1, 1);
    //                 this.ctx.clearRect(point.x - x, point.y + y, 1, 1);
    //                 this.ctx.clearRect(point.x + x, point.y - y, 1, 1);
    //                 this.ctx.clearRect(point.x - x, point.y - y, 1, 1);
    //             } else {
    //                 break; // Terminate inner loop
    //             }
    //         }
    //     }
    // }
  }
})
