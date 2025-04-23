import React from 'react';
import {connect} from 'react-redux';
import StartupScreenComponent from './StartupScreenComponent';
import * as startupActions from '../../actions/startupActions';


const StartupScreen = (props:any) => {
  return <StartupScreenComponent {...props} />;
};

const mapStateToProps = (state:any) => ({
  startupResponse: state.startupReducer.startupData,
  errorResponse: state.startupReducer.error,
});

const mapDispatchToProps = (dispatch:any) => ({
  getStartupData: (params:any) => {
    return dispatch(startupActions.getStartupData(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StartupScreen);
