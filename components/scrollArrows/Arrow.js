import React, { useState, useRef, useContext } from 'react'
import styles from './Arrow.module.css'
import cls from 'classnames'

const Arrow = (props) => {
  const { onClick, type, disabled, VisibilityContext, size } = props
  
  const  { scrollToItem, getPrevItem, getNextItem } = useContext(VisibilityContext);

  const [hover, setHover] = useState(false)

  const scrollInterval = useRef()

  const inlineStyle = (hover) => {
      if(hover){
      return { opacity:disabled ? '0' : '0.6'}
      } else {
           return { opacity:disabled ? '0' : '0.3'}
      }
  }

    const hoverHandler = () => {
        if(type === 'left'){
    const prevItem = getPrevItem();
    scrollToItem(prevItem?.entry?.target, "smooth", "start");
        } 
        if(type === 'right'){
            const nextItem = getNextItem();
           scrollToItem(nextItem?.entry?.target, "smooth", "end");
            }
    }


  const toggleOnHover = () => {
        setHover(!hover)
        hoverHandler()
        scrollInterval.current = setInterval(() => {
            hoverHandler()
        }, 500)}
        
  
    const toggleOffHover = () => {
      console.log(size)
        setHover(!hover)
        clearInterval(scrollInterval.current)
        
  }
  return (
      <>  
    <div style={inlineStyle(hover)} onMouseEnter={() => toggleOnHover()} onMouseLeave={() => toggleOffHover()} className={cls(styles[type], styles[size])} onClick={() => onClick()}></div>
      
      </>
  )
}

export default Arrow