import example from './assets/example.jpg';

type BackgroundMapping = {
  [schedule: number]: {
    image: string;
    clockColor: string;
    grayscale?: boolean;
    brightness?: number; // 0 -> 1
    font?: {
      family: string;
      size?: string;
      weight: number;
    };
  };
}

/*
* Background mapping
* */
export default {
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