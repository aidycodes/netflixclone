import React, { useState } from 'react'
import Card from './card'
import styles from './sectionCards.module.css'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Arrow from './Arrow';


const SectionCards = (props) => {

    const { title } = props
    const [scrollCheck, setScrollCheck ] = useState(false)


     const onWheel = (context, event) => {
         if(event.deltaY < 0){
          const nextItem = context.getNextItem();         
          if(nextItem !== scrollCheck ){
              console.log('ss')
          context.scrollToItem(nextItem?.entry?.target, "smooth", "end");
           setScrollCheck(nextItem)
          } else {
              context.scrollNext('smooth')
             
          }

         } else if (event.deltaY > 0){
             const prevItem = context.getPrevItem()
             if(prevItem !== scrollCheck){
                  context.scrollToItem(prevItem?.entry?.target, "smooth", "start");
                  setScrollCheck(prevItem)
             } else {
            context.scrollPrev('smooth')
             }
         }
    //    e.scrollNext()
      
     }

    const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow VisibilityContext={VisibilityContext} type="right" disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </Arrow>
  );
}

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow VisibilityContext={VisibilityContext} type="left" disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}


  return (
     
    <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.slideFix}>
          <ScrollMenu className={styles.cardWrapper} onWheel={(context, event) => onWheel(context, event)}  LeftArrow={LeftArrow} RightArrow={RightArrow}>
    
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'0'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'1'}/>
                <Card  size='large' itemId={'2'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'3'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'4'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'5'}/>
                <Card  size='large' itemId={'6'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'7'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'8'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'9'}/>
                <Card  size='large' itemId={'10'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'11'}/>
                      <Card imgUrl='/images/clifford.webp' size='large' itemId={'12'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'13'}/>
                <Card  size='large' itemId={'2'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'146'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'14'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'15'}/>
                <Card  size='large' itemId={'6'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'17'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'18'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'19'}/>
                <Card  size='large' itemId={'10'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'111'}/>
                      <Card imgUrl='/images/clifford.webp' size='large' itemId={'110'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'1211'}/>
                <Card  size='large' itemId={'2'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'1223'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'32434'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'3325'}/>
                <Card  size='large' itemId={'6'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'7'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'8'}/>            
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'9'}/>
                <Card  size='large' itemId={'10'}/>
                <Card imgUrl='/images/clifford.webp' size='large' itemId={'11'}/>
           
      
         </ScrollMenu>
         </div>
    </section>

  )
}

export default SectionCards