import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="eng">
        <Head>
          {/* fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Mirza:wght@700&family=Poppins:wght@400&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
