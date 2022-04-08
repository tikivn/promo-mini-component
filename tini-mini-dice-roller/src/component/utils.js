/**
 * @param {func} success
 */
export function watchPhoneShake(success = () => {}) {
  my.watchShake({ success });
}

/**
 * @param {func} success
 */
export function callPhoneVibrate(success = () => {}) {
  my.vibrate({ success })
}

export function toast(msg, duration = 3000) {
  my.showToast({
    type: 'success',
    content: JSON.stringify(msg),
    duration,
  });
}
