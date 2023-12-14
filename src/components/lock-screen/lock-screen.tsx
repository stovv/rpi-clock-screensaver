import React, {PropsWithChildren, useEffect, useState} from 'react';
import {useConfigContext} from "../clock";
import {useSwipeable} from "react-swipeable";

type LockScreenProps = {
    /**
     * Your props is here
     */
};


export const LockScreen: React.FC<PropsWithChildren<LockScreenProps>> = ({ children }) => {
  const top = (-1 * window.screen.height);
  const { locked, image, filter, setLocked } = useConfigContext();
  const [isSwipe, setIsSwipe] = useState(false);
  const [translateY, translate] = useState(0);

  const lock = () => {
    setIsSwipe(false);
    translate(0);
  }

  const unlock = () => {
    setIsSwipe(false);
    translate(top);
  }

  useEffect(() => {
    locked ? lock() : unlock();
  }, [locked])

  const handlers = useSwipeable({
    onSwiped: ({absY}) => {
      const unlocked = absY > window.screen.height * 0.3;

      if (locked && !unlocked) {
        lock();
        return;
      }

      setLocked(!unlocked);
    },
    onSwipeStart: () => {
      setIsSwipe(true);
    },
    onSwiping: (data) => {
      translate(data.deltaY > 0 ? 0 : data.deltaY);
    }
  });

  return (
    <div {...handlers}>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        minWidth: '100vw',
        minHeight: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        zIndex: 1000,
        transition: isSwipe ? undefined : 'transform 0.3s ease',
        transform: `translateY(${translateY}px)`,
      }}>
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 0,
          minWidth: '100vw',
          minHeight: '100vh',
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter,
        }}/>
        { children }
      </div>
    </div>
  );
};
