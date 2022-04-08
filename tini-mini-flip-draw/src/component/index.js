const toast = function (msg, duration = 3000) {
  my.showToast({
    content: JSON.stringify(msg),
    duration,
  });
};
const createFlipAnimation = function (duration = 600) {
  const ani = my.createAnimation({
    duration,
    timeFunction: 'ease-in-out',
  });
  ani.rotate3d(0, 1, 0, 180).step();
  return ani;
};

Component({
  data: {
    activeIndex: NaN,
    cardList: [],
  },
  props: {
    prizeList: [], // list prize
    prizeName: '', // prize name
    cardNum: 9, // the number of display cards, the recommended length is 3, 6, 9
    isDrawing: true, // whether to allow clicks
    flipAllCards: false, // whether to flip all undrawn cards
    cardHeight: 80,
    cardBgImg: '',
    unawardImg:
      'https://salt.tikicdn.com/ts/miniapp/f6/18/4e/5301f6d9d85fe91ee3aec42ccfdb5337.jpeg', // picture of not winning the lottery
    onFlipStart: () => {}, // Flip start event
  },
  didMount() {
    this.initCardList();
  },
  didUpdate(prevProps, prevData) {
    const { prizeName, prizeList, isDrawing, flipAllCards } = this.props;
    // if (!this.data.cardList.length) {
    //   this.initCardList();
    // }

    if (!isDrawing && prevProps.isDrawing) {
      // The prize information is updated, indicating that the lottery result has returned, and it is necessary to determine whether to win the prize or not.
      const prizes = prizeList.filter((item) => item.name === prizeName);
      this.lotteryCallback(prizes[0]);
    }

    if (flipAllCards) {
      this.flipRestCards();
    }
  },
  methods: {
    initCardList() {
      const cardList = [];
      const { cardNum, cardBgImg, cardHeight } = this.props;
      for (let i = 0; i < parseInt(cardNum); i++) {
        cardList.push({
          imgStyle: `height:${cardHeight}px;`,
          disabled: false,
          icon: cardBgImg,
          animation: my.createAnimation({}).export(),
        });
      }
      this.setData({ cardList });
    },
    onFlipStart(e) {
      if (this.props.isDrawing) return;

      const idx = e.currentTarget.dataset.idx;
      if (this.data.cardList[idx].disabled) return;

      this.setData({
        activeIndex: idx,
      });

      this.props.onFlipStart();
    },
    // Winning callback, you need to set the current card information as winning, play the animation, there is a prize parameter to indicate the winning, otherwise you will not win the prize
    lotteryCallback(prize) {
      const { activeIndex, cardList } = this.data;

      // Flip
      cardList[activeIndex].animation = createFlipAnimation().export();
      cardList[activeIndex].disabled = true;
      this.setData({ cardList });

      // Flip to half to modify the image
      setTimeout(() => {
        if (prize && prize.icon) {
          cardList[activeIndex].icon = prize.icon;
        } else {
          cardList[activeIndex].icon = this.props.unawardImg;
        }
        cardList[activeIndex].imgStyle += 'transform: rotateY(-180deg);';
        this.setData({ cardList });
      }, 300);
    },
    flipRestCards() {
      const { cardList } = this.data;
      cardList.forEach((item, index) => {
        if (!item.disabled) {
          item.animation = createFlipAnimation().export();
        }
      });
      this.setData({ cardList });

      setTimeout(() => {
        cardList.forEach((item, index) => {
          if (!item.disabled) {
            const { icon } = this.props.prizeList[index] || {};
            item.icon = icon || this.props.unawardImg;
          }
          if (item.imgStyle.indexOf('transform: rotateY(-180deg);') < 0) {
            item.imgStyle += 'transform: rotateY(-180deg);';
          }
          item.disabled = true;
        });
        this.setData({ cardList });
      }, 300);
    },
  },
});
