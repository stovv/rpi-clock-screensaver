import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useRef, useState} from "react";
import duration from "parse-duration";
import {format} from "date-fns";
import {selectHour} from "../../utils.ts";
import {BgMappingItem, Font, bgMapping, lockConfig} from "../../config.ts";

export const ConfigContext = createContext<{
  now: string;
  hour: string;
  filter: string;
  locked: boolean;
  font: Font;
} & Omit<BgMappingItem, 'font'>>({
  now: '',
  hour: '',
  image: '',
  font: {
    family: '',
    size: undefined,
    weight: 400
  },
  filter: '',
  clockColor: '',
  locked: true,
});

const ConfigDispatchContext = createContext<{
  setLocked: (state: boolean) => void;
  restartLockTimer: () => void;
}>({
  setLocked: () => {},
  restartLockTimer: () => {},
})

const getNow = () => format(new Date(), 'HH:mm');

export const ConfigContextProvider = ({ children }: PropsWithChildren) => {
  const lockTimer = useRef<number | null>(null);
  const [now, setNow] = useState(getNow());
  const hour = now.split(':')[0];
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setNow(getNow());
    }, duration('1s'))
  }, []);

  const clearLockTimer =  () => {
    if (!lockTimer.current) return;
    clearTimeout(lockTimer.current);
  }

  useEffect(() => {
    if (!locked) {
      lockTimer.current = setTimeout(() => {
        setLocked(true);
      }, duration(lockConfig.lock))
    }

    return clearLockTimer;
  }, [locked]);

  const contextConfig = useMemo(() => {
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

    const filter = bgMapping[selected]?.grayscale
      ? 'grayscale(100%)'
      :  `brightness(${bgMapping[selected]?.brightness ?? 0.7})`;

    const font = bgMapping[selected]?.font ?? defaultFont;

    return {
      ...bgMapping[selected],
      font,
      filter,
      clockColor: bgMapping?.[selected]?.clockColor ?? '#000'
    };
  }, [hour])

  return (
    <ConfigDispatchContext.Provider value={{ setLocked, restartLockTimer: clearLockTimer }}>
      <ConfigContext.Provider value={{
        now, hour, locked,
        ...contextConfig
      }}>
        {children}
      </ConfigContext.Provider>
    </ConfigDispatchContext.Provider>
  );
}

export const useConfigContext = () => {
  const configContext = useContext(ConfigContext);
  const configDispatch = useContext(ConfigDispatchContext);
  return {
    ...configContext,
    ...configDispatch
  }
};