import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'styles/main.css'
import 'styles/bootstrap.min.css'
import 'styles/bootstrap-rtl.min.css'
import { Navbar } from 'components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
