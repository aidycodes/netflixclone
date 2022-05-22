import React from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal';
import styles from '../../styles/video.module.css'
import clsx from 'classnames'
import { getYoutubeVideoById } from '../../lib/videos'
import Navbar from '../../components/nav/navbar'


Modal.setAppElement('#__next')

export const getStaticProps = async(context) => {

  //   const video = {
  //   title:'hi cute dog',
  //   publishTime:'1990-01-01',
  //   description:'random wort uess ill write like ten  this isnt too longrong ',
  //   channelTitle:'channelTitle',
  //   viewCount:3948493
  // }
  const {videoid} = context.params
  
  const videoArray = await getYoutubeVideoById(videoid)

  return {
    props:{
      video:videoArray.length >= 0 ? videoArray[0] : {}
    },
    revalidate:10,
  }
}

export const getStaticPaths = async() => {
   const listOfVideos = ["mYfJxlgR2jw","4zH5iYM4wJo","KCPEHsAViiQ"]

   const paths = listOfVideos.map((id) => (
     {params:{videoid:id}}
   ))

   return { paths, fallback:'blocking'}
}

const Video = ({ video }) => {

  const router = useRouter()
  const { videoid } = router.query


  const { title, publishTime, description, channelTitle, statistics:{viewCount} = {viewCount:0}} = video


  return (
    <div styles={styles.container}>
    <Navbar/> 
        <Modal
        isOpen={true}
        className={styles.modal}
        onRequestClose={() => router.back() }
        overlayClassName={styles.overlay}
        contentLabel="Video Info"
      >
               
        
          <iframe id="ytplayer" className={styles.videoPlayer} type="text/html" width="100%" height="360"
  src={`https://www.youtube.com/embed/${videoid}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
  frameborder="0"></iframe>

    <div className={styles.modalBody}>
        <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
            <p className={styles.publishTime}>
              {publishTime}
            </p>
            <p className={styles.title}>
              {title}
            </p>
            <p className={styles.description}>
              {description}
            </p>

            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
               <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
            
        </div>
    </div>
      </Modal>

    </div>
  )
}

export default Video