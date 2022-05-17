import React, { useState } from 'react'
import styles from './navbar.module.css'
import  { useRouter } from 'next/router'
import Link from 'next/link' 
import Image from 'next/image'

const Navbar = (props) => {

    const { userName } = props

    const router = useRouter()

    const [ showDropdown, setShowDropdown ] = useState(false)

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


  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
             <div className={styles.logoWrapper}>
          <Image src='/images/netflix.svg' alt="netflix logo" width="128px" height="34px"/> 
            </div>
        </a>
  
    
    <ul className={styles.navItems}>
        <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
        <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
    </ul>

    <nav className={styles.navContainer}>
        <div  onMouseOver={handleShowDropdownHoverOn} onMouseLeave={handleShowDropdownHoverOff}>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                <p className={styles.username}>{userName}</p>
               <Image src='/images/expand_more.svg' alt="expand dropdown" width="24px" height="24px"/> 
            </button>
            { showDropdown && 
            <div className={styles.navDropdown}>
                <Link href="/login">
                    <a className={styles.linkName}>Sign out</a>
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