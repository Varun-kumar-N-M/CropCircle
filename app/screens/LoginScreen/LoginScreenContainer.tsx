import React from 'react';
import {connect} from 'react-redux';
import LoginScreenComponent from './LoginScreenComponent';
import * as authActions from '../../actions/authActions';

const LoginScreen = (props: any) => {
  return <LoginScreenComponent {...props} />;
};

const mapStateToProps = (state: any) => ({
  signUpResponse: state.authReducer.signUpResponse,
  signUpError: state.authReducer.signUpError,
});

const mapDispatchToProps = (dispatch: any) => ({
  loginMobile: (signUpData: any) => {
    return dispatch(authActions.loginMobileRequest(signUpData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
