module.exports = {
  animation: {
    'bounce-in-top': 'bounce-in-top 1.1s both',
    'slide-in-left':
      'slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    'jello-horizontal': 'jello-horizontal 0.9s both',
    'jello-vertical': 'jello-vertical 0.9s both',
    spin: 'spin 2s both linear infinite',
  },
  keyframes: {
    'bounce-in-top': {
      '0%': {
        transform: 'translateY(-500px)',
        animationTimingFunction: 'ease-in',
        opacity: 0,
      },
      '38%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'ease-out',
        opacity: 1,
      },
      '55%': {
        transform: 'translateY(-65px)',
        animationTimingFunction: 'ease-in',
      },
      '72%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'ease-out',
      },
      '81%': {
        transform: 'translateY(-28px)',
        animationTimingFunction: 'ease-in',
      },
      '90%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'ease-out',
      },
      '95%': {
        transform: 'translateY(-8px)',
        animationTimingFunction: 'ease-in',
      },
      '100%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'ease-out',
      },
    },
    'slide-in-left': {
      '0%': {
        transform: 'translateX(-1000px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },

    'jello-horizontal': {
      '0%': {
        transform: 'scale3d(1, 1, 1)',
      },
      '30%': {
        transform: 'scale3d(1.25, 0.75, 1)',
      },
      '40%': {
        transform: 'scale3d(0.75, 1.25, 1)',
      },
      '50%': {
        transform: 'scale3d(1.15, 0.85, 1)',
      },
      '65%': {
        transform: 'scale3d(0.95, 1.05, 1)',
      },
      '75%': {
        transform: 'scale3d(1.05, 0.95, 1)',
      },
      '100%': {
        transform: 'scale3d(1, 1, 1)',
      },
    },

    'jello-vertical': {
      '0%': {
        transform: 'scale3d(1, 1, 1)',
      },
      '30%': {
        transform: 'scale3d(0.75, 1.25, 1)',
      },
      '40%': {
        transform: 'scale3d(1.25, 0.75, 1)',
      },
      '50%': {
        transform: 'scale3d(0.85, 1.15, 1)',
      },
      '65%': {
        transform: 'scale3d(1.05, 0.95, 1)',
      },
      '75%': {
        transform: 'scale3d(0.95, 1.05, 1)',
      },
      '100%': {
        transform: 'scale3d(1, 1, 1)',
      },
    },
    spin: {
      '0%': {
        transform: 'rotate3d(0deg, 0, 0)',
      },
      '100%': {
        transform: 'rotate3d(360deg, 0, 0)',
      },
    },
  },
};
