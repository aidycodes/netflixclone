import Head from 'next/head'
import React from 'react'
import Navbar from '../../components/nav/navbar'
import styles from '../../styles/Favourites.module.css'
import { getFavVideosList } from '../../lib/videos'
import useRedirectUser from '../../lib/useRedirectUser'
import Card from '../../components/card/card'
import Link from 'next/link'

export const getServerSideProps = async(context) => {

     const {userId, token} = await useRedirectUser(context)

    const videos = await getFavVideosList(userId, token)
   
    return {
        props:{
            favVideos:videos
        }
    }
}

const Favourites = ({ favVideos}) => {
    console.log(favVideos)
    const favouriteCards = favVideos.map(video => (
         <Link key={video.id} href={`/video/${video.id}`} >
        <a><Card size="small" id={video.id} imgUrl={video.imgUrl} shouldScale={false}/></a>
        </Link>
    ))
  return (
    <div>
        <Head>
            <title>Favourites</title>
        </Head>
        <main className={styles.main}>
            <Navbar/>
            <div className={styles.sectionWrapper}>
            <h2 className={styles.header}>Favourites</h2>
                <div className={styles.cardWrapper}>
                {favouriteCards}
                </div>
            </div>
        </main>
    </div>
  )
}

export default Favourites