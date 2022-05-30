import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal';
import styles from '../../styles/video.module.css'
import clsx from 'classnames'
import { getYoutubeVideoById } from '../../lib/videos'
import Navbar from '../../components/nav/navbar'
import Like from '../../components/icons/likeIcon';
import DisLike from '../../components/icons/dislikeIcon';

Modal.setAppElement('#__next')

export const getStaticProps = async(context) => {

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

  const [ like, setLike ] = useState(false)
  const [ dislike, setDislike ] = useState(false) 
  const [show, setShow] = useState(false)
  const [ timer, setTimer ] = useState(null)

  const router = useRouter()
  const { videoid } = router.query


  const { title, publishTime, description, channelTitle, statistics:{viewCount} = {viewCount:0}} = video

  const likeDislikeFunction = async(favourited) => {
  const response = await fetch('/api/stats', {
        method:'POST',
        body:JSON.stringify({
          videoId:videoid,
          favourited
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      return response  
  }

  const handleToggleLike = async() => {
    let favourited
    if(like){
    favourited = null
    } else{
      favourited = 1
    }
      setLike(!like)
      setDislike(false)
      likeDislikeFunction(favourited)    
  }

  const handleToggleDislike = async() => {
    let favourited
    if(dislike){
      favourited = null
    } else {
      favourited = 0
    }
        setDislike(!dislike)
        setLike(false)
        likeDislikeFunction(favourited)  
    }

  const showLikeDislike = () => {
    setShow(true)
    setTimer(new Date() / 1000)
  }

  useEffect(() =>{   
   const timerCheck = setInterval(() => {
      if(new Date() / 1000 > timer + 5 ){
        setShow(false)
        clearInterval(timerCheck)
      }
    }, 1000);
  },[timer])

  useEffect(() => {
    const setWatched = async() => {
      const response = await fetch('/api/setWatched', {
        method:"POST",
        body:JSON.stringify({
          videoId:videoid
        }),
        headers:{
          "Content-Type":"application/json"
        },
      })
    }
    setWatched()
  },[])

  useEffect(() => {
      const getLikeDislikeStats = async() => {
      const response = await fetch(`/api/stats?videoId=${videoid}`, {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      })
     const data = await response.json()
      if(data?.findVideo?.length > 0){
        if(data.findVideo[0].favourited === 1){
          setLike(true)
          setDislike(false)
        } else if(data.findVideo[0].favourited === 0){
          setLike(false)
          setDislike(true)
        } else{
          setLike(false)
          setDislike(false)
        }
      }
    }
   getLikeDislikeStats()
  },[])

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
     
          <iframe onMouseMove={showLikeDislike} id="ytplayer" className={styles.videoPlayer} type="text/html" width="100%" height="360"
  src={`https://www.youtube.com/embed/${videoid}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
  frameBorder="0">
  </iframe>
      <div className={clsx(styles.likeDislikeBtnWrapper, show ? styles.showHover : styles.hideHover)}>
      <div className={styles.likeBtnWrapper}>
        <button onClick={handleToggleLike}>
          <div className={styles.btnWrapper}>          
            <Like selected={like} />
          </div>
        </button>  
      </div>        
        <button onClick={handleToggleDislike}>
          <div className={styles.btnWrapper}>        
            <DisLike selected={dislike}  />           
          </div>
        </button>
     </div>

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