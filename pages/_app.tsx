import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'assets/main.css'
import 'assets/bootstrap.min.css'
import 'assets/bootstrap-rtl.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
