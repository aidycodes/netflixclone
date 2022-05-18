import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner/banner'
import Card from '../components/card/card'
import SectionCards from '../components/card/sectionCards'
import Navbar from '../components/nav/navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Video on demand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     
      <Navbar userName="{userName}"/>
      <Banner title='Clifford the red dog' subTitle='very cute dog' imgUrl="images/clifford.webp"/>

       <SectionCards title="Disney"/>

      <Card imgUrl='/images/clifford.webp' size='large'/>
      <Card  size='medium'/>
      <Card imgUrl='/images/clifford.webp' size='small'/>
     

    </div>
  )
}
