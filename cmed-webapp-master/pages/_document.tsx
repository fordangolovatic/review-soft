import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(): unknown {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link
          href="https://fonts.cdnfonts.com/css/euclid-circular-a"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
