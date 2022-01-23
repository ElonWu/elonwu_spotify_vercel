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

  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        // {
        //   source: '/some-page',
        //   destination: '/somewhere-else',
        //   has: [{ type: 'query', key: 'overrideMe' }],
        // },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        // {
        //   source: '/non-existent',
        //   destination: '/somewhere-else',
        // },
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/spotify/:path*',
          destination: `/spotify`,
        },
      ],
    };
  },
});
