import { Dimensions, PixelRatio } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const sizeWidth = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const sizeHeight = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
export const sizeFont = (size) =>
  PixelRatio.roundToNearestPixel(size * (SCREEN_WIDTH / BASE_WIDTH));