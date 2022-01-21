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
});
