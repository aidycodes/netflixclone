import Head from 'next/head'
import Banner from '../components/banner/banner'
import SectionCards from '../components/card/sectionCards'
import Navbar from '../components/nav/navbar'
import styles from '../styles/Home.module.css'
import { getVideos, getPopularVideos } from '../lib/videos'

export const getServerSideProps = async() => {
    const youtubeVideos = await getVideos('Disney Trailers')
    const productivityVideos = await getVideos('Productivity')
    const travelVideos = await getVideos('Travel')
    const popularVideos = await getPopularVideos()
    return {
      props:{youtubeVideos, travelVideos, productivityVideos, popularVideos}
    }
}

export default function Home({ youtubeVideos, travelVideos, productivityVideos, popularVideos }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Video on demand" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
 <div className={styles.main}>        
      <Navbar userName="{userName}"/>
      <Banner title='Clifford the red dog' subTitle='very cute dog' imgUrl="images/clifford.webp"/>
    <div className={styles.sectionWrapper}>
       <SectionCards title="Disney" size="large" videos={youtubeVideos}/>
    </div>
      <div className={styles.sectionWrapper}>
       <SectionCards title="Travel" size="small" videos={travelVideos}/>
    </div>
      <div className={styles.sectionWrapper}>
       <SectionCards title="Productivity" size="medium" videos={productivityVideos}/>
    </div>
          <div className={styles.sectionWrapper}>
       <SectionCards title="Popular" size="small" videos={popularVideos}/>
    </div>
    </div>
    </div>
  )
}
