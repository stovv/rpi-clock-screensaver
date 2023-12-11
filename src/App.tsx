import {useEffect, useMemo, useState} from "react";
import { format } from 'date-fns';
import duration from 'parse-duration';
import config from './config';
import {selectHour} from "./utils.ts";

const getNow = () => format(new Date(), 'HH:mm');

function App() {
  const [now, setNow] = useState(getNow());
  const hour = now.split(':')[0];

  useEffect(() => {
    setInterval(() => {
      setNow(getNow());
    }, duration('1s'))
  }, []);

  const {
    image,
    font,
    filter,
    clockColor
  } = useMemo(() => {
    const defaultFont = {
      family: 'Roboto',
      size: '15vw',
      weight: 600
    };

    const selected = selectHour(Number(hour));
    if (selected === null) {
      return  {
        image: 'https://source.unsplash.com/random?mountain',
        filter: `brightness(0.7)`,
        clockColor: '#fff',
        font: defaultFont
      }
    }

    const filter = config[selected]?.grayscale
      ? 'grayscale(100%)'
      :  `brightness(${config[selected]?.brightness ?? 0.7})`;

    const font = config[selected]?.font ?? defaultFont;

    return {
      ...config[selected],
      font,
      filter,
      clockColor: config?.[selected]?.clockColor ?? '#000'
    };
  }, [hour])

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      minWidth: '100vw',
      minHeight: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    }}>
      <div style={{
        zIndex: 0,
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter,
      }}/>
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
        zIndex: 20
      }}>{now}</h1>
    </div>

  )
}

export default App

