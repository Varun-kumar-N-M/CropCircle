/**
 * All Global Constants will listed here
 */
import scale from './Scale';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as AppConfig from '../common/AppConfig';
//Current Screen Constatnts
export const CURRENT_SCREEN_HEIGHT = height;
export const CURRENT_SCREEN_WIDTH = width;

//Design Screen Constatnts
export const SCREEN_HEIGHT = 667;
export const SCREEN_WIDTH = 375;

export const TOUCHABLE_ACTIVE_OPACITY = 0.7;

// Paggination Constants
export const RECORDS_PER_PAGE = 10;

//post image width and hieght
export const GURU_SENT_POSTS_IMAGE = scale(328);

export const USER_TOKEN = 'user_token';
// Color Constants
export const WHITE_COLOR = '#FFFFFF';
export const BLACK_COLOR = '#000000';

// Font Weight Constants
export const fontWeight: any = {
  Thin: '100',
  UltraLight: '200',
  Light: '300',
  Regular: '400',
  Medium: '500',
  Semibold: '600',
  Bold: '700',
  Heavy: '800',
  Black: '900',
};

// Style Constants
export const POSITION_ABSOLUTE = 'absolute';
export const POSITION_RELATIVE = 'relative';
export const CENTER = 'center';
export const LEFT = 'left';
export const UNDEFINED = 'undefined';
export const SPACE_BETWEEN = 'space-between';
export const FLEX_START = 'flex-start';
export const FLEX_END = 'flex-end';
export const ROW = 'row';
export const ROW_REVERSE = 'row-reverse';
export const COLUMN = 'column';
export const WINDOW = 'window';
export const PLATFORM_ANDROID = 'android';
export const PLATFORM_IOS = 'ios';
export const POSITION_RIGHT = 'right';
export const SPACE_AROUND = 'space-around';
export const STRETCH = 'stretch';
export const CONTAIN = 'contain';
export const BOLD = 'bold';

export const API_TIMEOUT = 30000;

export const RESEND_OTP_TIMEOUT = 45;

// API CALLING CONSTANTS
export const GET_API = 'GET';
export const POST_API = 'POST';
export const PUT_API = 'PUT';
export const DELETE_API = 'DELETE';
export const UPDATE_API = 'PUT';

export const TRANSPARENT = 'transparent';
export const DARK_BLUE = '#000850';


export const COMMON_LOGO_ICON=require("../../assets/login/cropcircle.gif");
export const APP_LOGO_ICON=require("../../assets/login/welcom.png")