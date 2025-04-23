/**
 * @ApiService is the single entry point for all api's calling, Here the Single fetch is written that will serve requests
 */

import * as Config from './config';
import * as CONST from '../utils/Constants';
import * as IXNUtils from '../utils/IXNUtils';
import * as AppConfig from '../common/AppConfig';

// Define type for error codes
enum ERROR_CODES {
  KNOWN = 'KNOWN',
  UNKNOWN = 'UNKNOWN',
  TIMEOUT = 'TIMEOUT',
}

// Define interfaces for API options and responses
interface ApiOptions {
  url: string;
  method: string;
  useAccessToken?: boolean;
  shouldAddGetParams?: boolean;
}

interface ErrorResponse {
  status: number;
  message: string;
  errorCode: ERROR_CODES;
}

interface UserToken {
  access_token: string;
}

const throwError = (
  error: any,
  errorCode: ERROR_CODES = ERROR_CODES.KNOWN,
  fromCatchBlock: boolean = true,
): never => {
  let errorObj: string = '';
  
  switch (errorCode) {
    case ERROR_CODES.KNOWN:
      if (error) {
        if (fromCatchBlock) {
          if (error.message) {
            errorObj = error.message;
          } else {
            errorObj = JSON.stringify({
              status: 0,
              message: 'Request timed out, please check your internet connection and try again.',
              errorCode: ERROR_CODES.TIMEOUT,
            } as ErrorResponse);
          }
        } else {
          errorObj = JSON.stringify(error);
        }
      } else {
        errorObj = JSON.stringify({
          status: 0,
          message: 'Request timed out, please check your internet connection and try again.',
          errorCode: ERROR_CODES.TIMEOUT,
        } as ErrorResponse);
      }
      break;
      
    case ERROR_CODES.TIMEOUT:
      errorObj = JSON.stringify({
        status: 0,
        message: 'Request timed out, please check your internet connection and try again.',
        errorCode: ERROR_CODES.TIMEOUT,
      } as ErrorResponse);
      break;
      
    case ERROR_CODES.UNKNOWN:
    default:
      errorObj = JSON.stringify({
        status: 0,
        message: 'There was some problem connecting to Ideaxecution servers, please check your internet connection and try again.',
        errorCode: ERROR_CODES.UNKNOWN,
      } as ErrorResponse);
      break;
  }
  
  IXNUtils.consoleLog('apiService', 'throwError', 'errorObj', errorObj);
  throw new Error(errorObj);
};

export async function CommonFetch<T>(params: Record<string, any>, opt: ApiOptions): Promise<T> {
  try {
    let URL = `${Config.API_ENDPOINT}${opt.url}`;
    let uriParams = new URLSearchParams(params).toString();

    const Options = {
      method: opt.method,
      URL,
      body: uriParams,
    };

    const ReqOptions: RequestInit & { timeout?: number } = {
      method: Options.method,
      headers: {
        Authorization: '',
        'Cache-Control': 'no-cache',
        'x-mobile-request': '1',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: uriParams,
      timeout: CONST.API_TIMEOUT,
    };

    if (opt.useAccessToken) {
      const userToken: UserToken | null = AppConfig.userToken();
      if (userToken?.authorisation?.token) {
        (ReqOptions.headers as Record<string, string>).Authorization = 
          'Bearer ' + userToken?.authorisation?.token;
      }
    }

    if (ReqOptions.method === CONST.GET_API) {
      delete ReqOptions.body;
      if (opt.shouldAddGetParams === true) {
        URL += '?';
        URL += uriParams;
      }
    } else {
      ReqOptions.body = Options.body;
    }

    IXNUtils.consoleLog('apiService', 'CommonFetch', 'URL', URL);
    IXNUtils.consoleLog('apiService', 'commonfetch', 'REQOptions', ReqOptions);

    try {
      return new Promise<T>((Resolve, Reject) => {
        requestTimeoutPromise(
          ReqOptions.timeout as number,
          fetch(URL, ReqOptions),
          Resolve,
          Reject,
        );
      })
        .then(Response => {
          IXNUtils.consoleLog(
            'apiService',
            'CommonFetch',
            'Response.status',
            Response.status,
          );
          
          if (Response.status === 200 || Response.status === 201) {
            return Response.json().then((responseObject): T => {
              return responseObject;
            });
          } else if (Response.status === 400 || Response.status === 403) {
            // Handle application state for 400/403
            return Response.json().then(res => {
              if (res) {
                IXNUtils.consoleLog(
                  'apiService',
                  'CommonFetch',
                  'Error-400/403',
                  res,
                );
                return throwError(res, ERROR_CODES.KNOWN, false);
              }
              return throwError(null, ERROR_CODES.UNKNOWN, false);
            });
          } else if (Response.status === 404) {
            // Handle application state for 404
            return Response.json().then(res => {
              if (res) {
                IXNUtils.consoleLog(
                  'apiService',
                  'CommonFetch',
                  'Error-404',
                  res,
                );
                return throwError(res, ERROR_CODES.KNOWN, false);
              }
              return throwError(null, ERROR_CODES.UNKNOWN, false);
            });
          } else {
            // Handle application state for any other type of error
            if (AppConfig.APP_ENV() === AppConfig.Environments.prod) {
              return throwError(null, ERROR_CODES.UNKNOWN, false);
            } else {
              return Response.json().then(res => {
                if (res) {
                  IXNUtils.consoleLog(
                    'apiService',
                    'CommonFetch',
                    'Error',
                    res,
                  );
                  return throwError(res, ERROR_CODES.KNOWN, false);
                }
                return throwError(null, ERROR_CODES.UNKNOWN, false);
              });
            }
          }
        })
        .catch(error => {
          if (
            error === 'Request Timeout' ||
            error === 'Network request failed'
          ) {
            return throwError(null, ERROR_CODES.TIMEOUT);
          }
          return throwError(error, ERROR_CODES.KNOWN);
        });
    } catch (error) {
      return throwError(error, ERROR_CODES.KNOWN);
    }
  } catch (error) {
    return throwError(error, ERROR_CODES.KNOWN);
  }
}




export async function uploadFile(params:any, opt:any) {
  try {
    let URL = `${Config.API_ENDPOINT}` + `${opt.url}`;

    IXNUtils.consoleLog('apiService', 'uploadFile', 'URL', URL);

    let uriParams = new URLSearchParams(params).toString();

    IXNUtils.consoleLog('apiService', 'uploadFile', 'opt', JSON.stringify(opt));
    const data = new FormData();
    data.append('build', params.build);
    data.append('device', params.device);
    data.append('odid', params.odid);
    if (params.profile_image) {
      data.append('profile_image', params.profile_image);
    }
    if (params.to_profile_image) {
      data.append('to_profile_image', params.to_profile_image);
    }
    if (params.to_mn) {
      data.append('to_mn', params.to_mn);
    }
    if (params.shop_image) {
      data.append('shop_image', params.shop_image);
    }

    IXNUtils.consoleLog(
      'apiService',
      'uploadUsuploadFileerProfilePicture',
      'data',
      JSON.stringify(data),
    );
    const ReqOptions = {
      method: opt.method,
      headers: {
        Authorization: '',
        'Cache-Control': 'no-cache',
        'x-mobile-request': 1,
      },
      body: data,
      timeout: 50000,
    };
    if (opt.useAccessToken) {
      AppConfig.userToken()?.authorisation?.token
        ? (ReqOptions.headers.Authorization =
            'Bearer ' + AppConfig.userToken()?.authorisation?.token)
        : '';
    }
    ReqOptions.headers['Content-Type'] = 'multipart/form-data;';

    IXNUtils.consoleLog(
      'apiService',
      'uploadFile',
      'ReqOptions',
      JSON.stringify(ReqOptions),
    );
    try {
      return new Promise((Resolve, Reject) => {
        requestTimeoutPromise(
          ReqOptions.timeout,
          fetch(URL, ReqOptions),
          Resolve,
          Reject,
        );
      })
        .then((Response) => {
          IXNUtils.consoleLog(
            'apiService',
            'uploadFile',
            'Response.status',
            Response.status,
          );
          if (Response.status === 200 || Response.status === 201) {
            return Response.json().then((responseObject) => {
              return responseObject;
            });
          } else if (Response.status === 400 || Response.status === 403) {
            //TO DO handle application state for 400/403
            return Response.json().then((res) => {
              if (res) {
                IXNUtils.consoleLog(
                  'apiService',
                  'uploadFile',
                  'Error-400/403',
                  res,
                );
                return throwError(res, ERROR_CODES.KNOWN, false);
              }
              return throwError(null, ERROR_CODES.UNKNOWN, false);
            });
          } else if (Response.status === 404) {
            //TO DO handle application state for 404
            return Response.json().then((res) => {
              if (res) {
                IXNUtils.consoleLog(
                  'apiService',
                  'uploadFile',
                  'Error-404',
                  res,
                );
                return throwError(res, ERROR_CODES.KNOWN, false);
              }
              return throwError(null, ERROR_CODES.UNKNOWN, false);
            });
          } else {
            //TO DO handle application state for any other type of error
            if (AppConfig.APP_ENV() === AppConfig.Environments.prod) {
              return throwError(null, ERROR_CODES.UNKNOWN, false);
            } else {
              return Response.json().then((res) => {
                if (res) {
                  IXNUtils.consoleLog('apiService', 'uploadFile', 'Error', res);
                  return throwError(res, ERROR_CODES.KNOWN, false);
                }
                return throwError(null, ERROR_CODES.UNKNOWN, false);
              });
            }
          }
        })
        .catch((error) => {
          if (
            error === 'Request Timeout' ||
            error === 'Network request failed'
          ) {
            return throwError(null, ERROR_CODES.TIMEOUT);
          }
          return throwError(error, ERROR_CODES.KNOWN);
        });
    } catch (error) {
      return throwError(error, ERROR_CODES.KNOWN);
    }
  } catch (error) {
    return throwError(error, ERROR_CODES.KNOWN);
  }
}

function requestTimeoutPromise<T>(
  waitingTime: number,
  promise: Promise<Response>,
  resolveInternal: (value: Response | PromiseLike<Response>) => void,
  rejectInternal: (reason?: any) => void,
): void {
  const _timeout = setTimeout(() => {
    rejectInternal('TIMEOUT');
  }, waitingTime);
  
  try {
    promise.then(
      res => {
        clearTimeout(_timeout);
        resolveInternal(res);
      },
      resError => {
        IXNUtils.consoleLog(
          'apiService',
          'requestTimeoutPromise',
          'Timeout Error1',
          resError,
        );
        throwError(resError, ERROR_CODES.KNOWN, false);
        clearTimeout(_timeout);
        rejectInternal('Request Timeout');
      },
    );
  } catch (error) {
    IXNUtils.consoleLog(
      'apiService',
      'requestTimeoutPromise',
      'Timeout Error2',
      error,
    );
    throwError(error, ERROR_CODES.KNOWN);
  }
}