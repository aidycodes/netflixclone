import React from 'react'
import Card from './card'
import styles from './sectionCards.module.css'
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { onWheel } from '../scrollArrows/onWheel';
import { RightArrow, LeftArrow } from '../scrollArrows/ArrowFunctions';
import  Link from 'next/link'


const SectionCards = (props) => {

    const { title, videos, size,  } = props

  return (
     
    <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.slideFix}>
          <ScrollMenu className={styles.cardWrapper} onWheel={(context, event) => onWheel(context, event)}  LeftArrow={() => LeftArrow(size)} RightArrow={() => RightArrow(size)}>
                {videos?.map((video, i) => (
                    <Link key={video.id} href={`/video/${video.id}`} itemId={title + video.id}>
                      <a>  <Card imgUrl={video.imgUrl} size={size} />  </a>
                    </Link>    
                ))}                          
         </ScrollMenu>
         </div>
    </section>

  )
}

export default SectionCards