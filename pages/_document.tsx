import Document, { Html, Head, Main, NextScript } from 'next/document';

// 替换全局的 document 布局
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
          <meta name="description" content="ElonWu Spotify" />
          <link rel="icon" href="/favicon.ico" />
          <NextScript />
        </Head>

        <body className="font-semi">
          <Main />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
