import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import StartupScreen from '../screens/StartupScreen/StartupScreenContainer';
import Loginscreen from '../screens/LoginScreen/LoginScreenContainer';



import Scale from '../utils/Scale';


// Define the root stack parameter list
export type RootStackParamList = {
  StartupScreen: undefined;
  Loginscreen: undefined;
};

const ScreensStack = createStackNavigator<RootStackParamList>();



const MainScreen: React.FC = () => {
  return (
    <ScreensStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <ScreensStack.Screen name="StartupScreen" component={StartupScreen} /> */}
      <ScreensStack.Screen name="Loginscreen" component={Loginscreen} />
    </ScreensStack.Navigator>
  );
};

export default MainScreen;