import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import Arrow from "./Arrow";

export const RightArrow = (size) => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Arrow VisibilityContext={VisibilityContext} type="right" size={size} disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </Arrow>
  );
}

export const LeftArrow = (size) => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Arrow VisibilityContext={VisibilityContext} type="left" size={size} disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}
