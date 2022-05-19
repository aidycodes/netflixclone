import React, { useState } from 'react'
import Image from 'next/image'
import styles from './card.module.css'
import { motion } from 'framer-motion'
import cls from 'classnames'

const Card = (props) => {

    const {imgUrl = "/images/cliffor.webp", size = "medium", itemId} = props

    const [ imgSrc, setImgSrc ] = useState(imgUrl)

    const classMap = {
        large:styles.lgItem,
        medium:styles.mdItem,
        small:styles.smItem
    }

    const handleOnError = () => {
        setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80')
    }

    const scale = itemId ===  0   ? {scaleY:1.1,scaleX:1.02, transition:{duration:0.2}} : {scaleY:1.1, scaleX:1.05, transition:{duration:0.2}}

  return (
    <div className={styles.container}>
        <motion.div   whileHover={{...scale}} className={cls(classMap[size], styles.imgMotionWrapper )}>
        <Image src={imgSrc} className={styles.cardImg} layout="fill" alt="Image" onError={handleOnError}/>
        </motion.div>
    </div>  
  )
}

export default Card