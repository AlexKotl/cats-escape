import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="night">
      <Head />
      <body className="flex justify-center items-center min-h-screen bg-base-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
