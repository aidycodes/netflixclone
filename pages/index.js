import Head from 'next/head'
import Banner from '../components/banner/banner'
import SectionCards from '../components/card/sectionCards'
import Navbar from '../components/nav/navbar'
import styles from '../styles/Home.module.css'
import { getVideos, getPopularVideos } from '../lib/videos'
import { getWatchItAgainVideos } from '../lib/videos'
import useRedirectUser from '../lib/useRedirectUser'

export const getServerSideProps = async(context) => {

 const {userId, token} = await useRedirectUser(context)

    const watchItAgainVideos = await getWatchItAgainVideos(userId, token)
    const youtubeVideos = await getVideos('Disney Trailers')
    const productivityVideos = await getVideos('Productivity')
    const travelVideos = await getVideos('Travel')
    const popularVideos = await getPopularVideos()

     const i = Math.floor(Math.random()*25)
     const bannerData = popularVideos[i]
    

    return {
      props:{youtubeVideos, travelVideos, productivityVideos, popularVideos, watchItAgainVideos, bannerData}
    }
}

export default function Home({ youtubeVideos, travelVideos, productivityVideos, popularVideos, watchItAgainVideos, bannerData }) {

 const{title, imgUrl, description} = bannerData

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Video on demand" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
 <div className={styles.main}>        
      <Navbar userName="{userName}"/>
      <Banner title={'Clifford the red dog'} subTitle='very cute dog' imgUrl="images/clifford.webp" videoId="4zH5iYM4wJo"/>
    <div className={styles.sectionWrapper}>
       <SectionCards title="Disney" size="large" videos={youtubeVideos}/>
    </div>
    {watchItAgainVideos.length > 0 &&
     <div className={styles.sectionWrapper}>
       <SectionCards title="Watch It Again" size="small" videos={watchItAgainVideos}/>
    </div> 
    }
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
