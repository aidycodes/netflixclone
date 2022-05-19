import Head from 'next/head'
import Banner from '../components/banner/banner'
import SectionCards from '../components/card/sectionCards'
import Navbar from '../components/nav/navbar'
import styles from '../styles/Home.module.css'
import { getVideos } from '../lib/videos'

export const getServerSideProps = async() => {
    const youtubeVideos = getVideos()
    return {
      props:{youtubeVideos}
    }
}

export default function Home({ youtubeVideos }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Video on demand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>    
      <Navbar userName="{userName}"/>
      <Banner title='Clifford the red dog' subTitle='very cute dog' imgUrl="images/clifford.webp"/>
    <div className={styles.sectionWrapper}>
       <SectionCards title="Disney" size="large" videos={youtubeVideos}/>
    </div>
      <div className={styles.sectionWrapper}>
       <SectionCards title="Cheese" size="medium" videos={youtubeVideos}/>
    </div>
      <div className={styles.sectionWrapper}>
       <SectionCards title="Goats" size="small" videos={youtubeVideos}/>
    </div>
    </div>
  )
}
