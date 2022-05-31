import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/login.module.css'
import  { isValidEmail } from '../lib/isValidEmail'
import { useRouter } from 'next/router'
import { magic } from '../lib/magicClient'
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {

    const [userMsg, setUserMsg] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleLoginWithEmail = async(e) => {
        e.preventDefault()
        const isValid = isValidEmail(email);
        if(isValid){
              setIsLoading(true)
               try {
                const didToken = await magic.auth.loginWithMagicLink({ email });
                 if(didToken){
                     const response = await fetch('/api/login', {
                         method:'POST',
                         headers:{
                             'Authorization':`Bearer ${didToken}`,
                             'Content-Type': "application/json"
                         }
                     })
                     const loggedInResponse = await response.json()
                     if(loggedInResponse.done){
                         router.push('/')
                     } else {
                         setIsLoading(false)
                         setUserMsg('Something went Wrong...')
                     }
                    
                 }
                } catch(err) {
                console.log("something went wrong loggin in", err)
                } 
 
        } else {
            setUserMsg("Please enter a valid email address")
        }

    }

    const handleOnChangeEmail= (e) => {
        setUserMsg("")
         setEmail(e.target.value)

    }

    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false)
        }
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)
    
      return () => {
        router.events.off('routeChangeComplete')
         router.events.off('routeChangeError')
      }
    }, [router])
    

  return (
    <div className={styles.container}>
    <Head>
        <title>Netflix Login</title>
        <meta name="description" content="Video on demand" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
            <a className={styles.logoLink} href="/">
             <div className={styles.logoWrapper}>
                <Image src='/images/netflix.svg' alt="netflix logo" width="128px" height="34px"/> 
             </div>
            </a>
            </div>
        </header>
        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <h1 className={styles.signinHeader}>Sign In</h1>
                <input className={styles.emailInput} type="text" placeholder='email address' onChange={handleOnChangeEmail}/>
                <p className={styles.userMsg}>{userMsg}</p>
                <button className={styles.loginBtn} onClick={handleLoginWithEmail}>{isLoading ? <CircularProgress size={20}/> : "Sign In"}</button>
             </div>
        </main>
    </div>
  )
}

export default Login