import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Loading from '../components/loading/loading';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return  <Component {...pageProps} />
}

export default MyApp
