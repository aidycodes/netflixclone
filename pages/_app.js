import { useState, useEffect } from 'react'
import { magic } from '../lib/magicClient';
import { useRouter } from 'next/router';
import Loading from '../components/loading/loading';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const checkLoggedIn = async() => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if(isLoggedIn){
      router.push('/')
    } else {
      router.push('/login')
    }
  }

      useEffect(() => {
        const handleComplete = () => {
          setTimeout(() => {
            setIsLoading(false)
          }, 100);
            
        }
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)
    
      return () => {
        router.events.off('routeChangeComplete')
         router.events.off('routeChangeError')
      }
    }, [router])

  useEffect(() =>{
    checkLoggedIn()
  },[])

  return isLoading ? <Loading/> : <Component {...pageProps} />
}

export default MyApp
