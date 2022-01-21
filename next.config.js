// next.config.js
const semi = require('@douyinfe/semi-next').default({
  /* the extension options */
});
module.exports = semi({
  reactStrictMode: true,

  api: {
    bodyParser: {
      sizeLimit: '500k',
    },
  },

  images: {
    domains: ['i.scdn.co', 'images.unsplash.com'], // 允许的图片来源地址
  },
});
