import React from 'react';
import { useConfigContext } from "./context.tsx";

type ClockProps = {
    /**
     * Your props is here
     */
};

export const Clock: React.FC<ClockProps> = () => {
  const { now, clockColor, font } = useConfigContext();

  return (
    <h1 style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      textAlign: 'center',
      transform: 'translate(-50%, -50%)',
      height: 'min-content',
      fontSize: font.size,
      fontFamily: font.family,
      fontWeight: font.weight,
      color: clockColor,
      zIndex: 20,
      cursor: 'default'
    }}>{now}</h1>
  )
};
