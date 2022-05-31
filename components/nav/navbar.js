import React, { useState, useEffect } from 'react'
import styles from './navbar.module.css'
import  { useRouter } from 'next/router'
import Link from 'next/link' 
import Image from 'next/image'
import { magic } from '../../lib/magicClient'


const Navbar = (props) => {

    const router = useRouter()

    const [ showDropdown, setShowDropdown ] = useState(false)
    const [email, setEmail ] = useState('')

    const handleOnClickHome = (e) => {
        e.preventDefault()
        router.push('/')

    }
    const handleOnClickMyList = (e) => {
        e.preventDefault()
        router.push('/browse/my-list')

    }
    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown)
    }
    const handleShowDropdownHoverOn = () => {
        setShowDropdown(true)
    }
      const handleShowDropdownHoverOff = () => {
        setShowDropdown(false)
    }


    const loginInfo = async() => {
        try {
         const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken()
         setEmail(email)
    } catch(err) {
  console.log('login info error',err)
    }
}

const handleLogout = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/logout", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      
      if(res.msg === 'success' ){
           router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

    useEffect(() => {
      loginInfo()
    },[])

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
             <div className={styles.logoWrapper} width="128px" height="34px">
          <Image src='/images/netflix.svg' alt="netflix logo" layout="fill"/> 
            </div>
        </a>
  
    
    <ul className={styles.navItems}>
        <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
        <li className={styles.navItem2} onClick={handleOnClickMyList}>Favourites</li>
    </ul>

    <nav className={styles.navContainer} >
        <div  >
            <button className={styles.usernameBtn} onClick={handleShowDropdown} onMouseOver={handleShowDropdownHoverOn} onMouseLeave={handleShowDropdownHoverOff}>
                <p className={styles.username}>{email}</p>
               <Image src='/images/expand_more.svg' alt="expand dropdown" width="24px" height="24px"/> 
            </button>
            { showDropdown && 
            <div className={styles.navDropdown} onMouseOver={handleShowDropdownHoverOn} onMouseLeave={handleShowDropdownHoverOff}    >
                <Link href="/login" >
                    <a className={styles.linkName} onClick={handleLogout}   >Sign out</a>
                </Link>
            </div>
            }
        </div>
    </nav>
  </div>
    </div>
  )
}

export default Navbar