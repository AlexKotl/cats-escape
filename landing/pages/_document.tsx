import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="night">
      <Head>
        <title>Cats Escape the Game</title>
        <meta
          name="description"
          content="The game about lazy cats and dumb mouse."
        />
      </Head>
      <body className="flex justify-center items-center min-h-screen bg-base-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
