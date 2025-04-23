import {StyleSheet} from 'react-native';
import * as CONST from '../../utils/Constants';
import scale from '../../utils/Scale';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONST.WHITE_COLOR,
  },
  bodyContainer: {
    flex: 1,
    width: '100%',
    backgroundColor:'white',
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
  },
  logoImage:{
    width: '60%',
    height:'30%',
  },
  backgroundImage: {
    flex: scale(1),
    position: CONST.POSITION_ABSOLUTE,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  envContainer: {
    flex: 1,
    position: 'absolute',
    bottom: scale(50),
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
  },
  envButtonContainer: {
    flexDirection: 'row',
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
    paddingTop: scale(30),
    paddingBottom: 20,
  },
  envButton: {
    width: scale(125),
    height: scale(85),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textstyle: {
    fontFamily: 'bold',
    color: 'black',
    fontStyle:'italic',
    textAlign: 'center',
    fontSize: scale(30),
  },
});
export default Styles;
