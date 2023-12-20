import example from './assets/example.jpg';

export type Font = {
  family: string;
  size?: string;
  weight: number;
};

export type BgMappingItem = {
  image: string;
  clockColor: string;
  grayscale?: boolean;
  brightness?: number; // 0 -> 1
  font?: Font;
};

type BackgroundMapping = {
  [schedule: number]: BgMappingItem;
}

/*
* Background mapping
* */
export const bgMapping = {
   0: {
      image: example,
      clockColor: '#fff',
      brightness: 0.4,
      font: {
        family: "'Open Sans'",
        size: '15vw',
        weight: 500
      }
   },
   // 2: {
   //  image: example,
   //  clockColor: '#000',
   //  brightness: 0.4,
   //  font: {
   //    family: "'Open Sans'",
   //    size: '15vw',
   //    weight: 500
   //  }
  // }
} as BackgroundMapping;

type LockConfig = {
  lock: string;
  iframeSrc: string;
  // blank: string | null;
};

export const lockConfig: LockConfig = {
  lock: '1m',
  iframeSrc: 'http://localhost',
  // blank: '10m',
};