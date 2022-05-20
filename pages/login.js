import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/login.module.css'
import  { isValidEmail } from '../lib/isValidEmail'
import { useRouter } from 'next/router'

const Login = () => {

    const [userMsg, setUserMsg] = useState("")
    const [valid, setValid] = useState(false)
    const [email, setEmail] = useState("")

    const router = useRouter()

    const handleLoginWithEmail = (e) => {
        e.preventDefault()
        const isValid = isValidEmail(email);
        if(isValid){
            if(email === 'aidycodes@gmail.com'){
                console.log('signing in')
                router.push('/')
            } else {
                     setUserMsg("Something Went Wrong...")
            }
        } else {
            setUserMsg("Please enter a valid email address")
        }

    }

    const handleOnChangeEmail= (e) => {
        setUserMsg("")
         setEmail(e.target.value)

    }

  return (
    <div className={styles.container}>
     <Head>
        <title>Netflix Sign In</title>        
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
                <button className={styles.loginBtn} onClick={handleLoginWithEmail}>Sign In</button>
             </div>
        </main>
    </div>
  )
}

export default Login