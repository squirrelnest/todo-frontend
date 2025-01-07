import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <script src="https://cdn.tailwindcss.com" />
      </Head>
      <body className="grid place-items-center bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}