
     
export const onWheel = (context, event) => {
         let scrollCheck
         if(event.deltaY < 0){
          const nextItem = context.getNextItem();         
          if(nextItem !== scrollCheck ){
          context.scrollToItem(nextItem?.entry?.target, "smooth", "end");
           scrollCheck = nextItem
          } else {
              context.scrollNext('smooth')
             
          }

         } else if (event.deltaY > 0){
             const prevItem = context.getPrevItem()
             if(prevItem !== scrollCheck){
                  context.scrollToItem(prevItem?.entry?.target, "smooth", "start");
                  scrollCheck = prevItem
             } else {
            context.scrollPrev('smooth')
             }
         }

     }