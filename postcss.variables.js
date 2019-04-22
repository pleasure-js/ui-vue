const colors = {
  sony: '#e23533',
  green: '#27BAB4',
  grayPale: '#e7e7e7',
  gray: '#999',
  strongGray: '#666',
  midBlack: '#434344',
  strongBlack: '#242424',
  black: '#343434',
  realBlack: '#141414',
  grayLight: '#ccc',
  orange: '#fc0',
  sand: '#fef0c1',
  white: '#e7e7e7'
}

const palette = {
  primary: colors.sony,
  light: colors.grayLight,
  secondary: colors.white,
  warning: colors.orange,
  danger: colors.red,
  dark: colors.strongBlack
}

const theme = {
  primary: colors.sony,
  secondary: colors.white
}

module.exports = {
  pleasure: {
    palette,
    colors,
    input: {
      border: 'none',
      colorPlaceholder: colors.midBlack,
      color: {
        default: colors.grayPale,
        icon: {
          default: theme.primary,
          over: theme.primary,
          focus: theme.primary
        },
        label: {
          default: colors.strongGray
        },
        select: theme.secondary,
        caret: theme.primary,
        placeholder: {
          over: colors.midBlack,
          focus: colors.midBlack,
          solid: colors.strongBlack
        },
        over: colors.grayPale,
        focus: colors.grayPale,
        solid: colors.strongBlack
      },
      background: {
        default: colors.strongBlack,
        select: theme.primary,
        focus: `color(${colors.strongBlack} shade(10%))`,
        over: `color(${colors.strongBlack} shade(5%))`,
        solid: colors.grayLight
      }
    },
    dropdown: {
      color: {
        button: {
          default: colors.white,
          over: colors.white
        }
      },
      background: {
        default: theme.primary,
        button: {
          default: `transparent`,
          over: colors.realBlack
        }
      }
    },
    calendar: {
      background: palette.dark
    },
    button: {
      color: {
        cancel: {
          default: colors.gray,
          over: colors.gray
        },
        action: {
          default: colors.strongBlack,
          over: colors.strongBlack
        },
        disabled: colors.strongGray
      },
      background: {
        cancel: {
          default: colors.midBlack,
          over: `color(${colors.midBlack} tint(5%))`
        },
        action: {
          default: palette.primary,
          over: `color(${palette.primary} tint(10%))`
        },
        disabled: colors.gray
      }
    },
    notification: {
      button: {
        color: {
          close: palette.primary,
          cancel: colors.gray,
          action: palette.primary
        },
        background: {
          cancel: colors.midBlack,
          action: palette.primary
        }
      },
      color: {
        title: colors.gray
      },
      background: {
        default: colors.strongBlack,
        title: `transparent`
      }
    }
  }
}
