import React from 'react';
import {Clock} from "../clock";
import {BsChevronCompactUp} from "react-icons/bs";

type HorizontalLayoutProps = {
  /**
   * Your props is here
   */
};

const weatherConfig = {
  "t":"s","v":"1.2",
  "lang":"ru",
  "locs":[],
  "ssot":"c",
  "sics":"ms",
  "cbkg":"#FFFFFF00",
  "cfnt":"rgba(255,255,255,1)",
  "slpd":40,
  "slgp":12,
  "slbr":"8",
  "sdr":"lr",
  "slfs": window.screen.height * 0.1,
  "slis": window.screen.height * 0.1
}

export const HorizontalLayout: React.FC<HorizontalLayoutProps> = () => {

  return (
    <>
      <Clock/>
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: `${weatherConfig.slis * 4 + weatherConfig.slpd}px`,
        height: `${weatherConfig.slis + weatherConfig.slpd}px`
      }}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <div id="id8857552e0cd14" a={JSON.stringify(weatherConfig)}>
          <a href="https://meteolabs.org/informer/">Информер погоды для сайта от meteolabs.org</a></div>
      </div>
      <div style={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, 0)',
        bottom: 0,
        padding: 0
      }}>
        <BsChevronCompactUp color={'#fff'} size={window.screen.height / 10}/>
      </div>
    </>
  );
};

