import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

type NavigationParams = Record<string, any> | undefined;

let navigator: NavigationContainerRef<any> | null = null;

export function setTopLevelNavigator(navigatorRef: NavigationContainerRef<any>) {
  navigator = navigatorRef;
}

export function navigateToScreen(
  route: string, 
  currNavigation: NavigationContainerRef<any>, 
  _params?: NavigationParams
): void {
  const navigateAction = CommonActions.navigate({
    name: route,
    params: _params,
  });
  currNavigation.dispatch(navigateAction);
}

export function resetApp(): void {
  if (navigator) {
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'StartupScreen' }],
      })
    );
  } else {
    console.warn('Navigator is not set');
  }
}

export function goBack(): void {
  if (navigator) {
    navigator.dispatch(CommonActions.goBack());
  } else {
    console.warn('Navigator is not set');
  }
}
