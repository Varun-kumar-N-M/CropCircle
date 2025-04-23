import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import screenStyles from './LoginScreenStyles';
import * as CONST from '../../utils/Constants';
import * as STR_CONST from '../../utils/StringContants';
import * as IXNUtils from '../../utils/IXNUtils';
import * as AppConfig from '../../common/AppConfig';
import Scale from '../../utils/Scale';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreenComponent = (props: any) => {
  const [phone, setPhone] = useState('');
  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    if (phone.length < 10) {
      IXNUtils.showMessage(
        STR_CONST.MESSAGE_TITLES.ALERT,
        STR_CONST.INVALID_PHONE,
        STR_CONST.BUTTONS_TEXTS.OK,
      );
      return;
    }
    // Add login logic here
  };

  const handleRegister = () => {
    // Add validation and registration logic here
    if (!name || !phone || !email || !address || !pwd) {
      IXNUtils.showMessage(
        STR_CONST.MESSAGE_TITLES.ALERT,
        'All fields are required',
        STR_CONST.BUTTONS_TEXTS.OK,
      );
      return;
    }
    // Registration logic
  };

  const renderLoginForm = () => {
    return (
      <View style={screenStyles.container}>
        <View style={screenStyles.topSection}>
          <Image source={CONST.APP_LOGO_ICON} style={screenStyles.logo} />
          <Text style={screenStyles.loginText}>Welcome Back</Text>
          <Text style={screenStyles.appName}>
            Login to connect with fellow farmers
          </Text>
        </View>

        <View style={screenStyles.formSection}>
          <TextInput
            style={screenStyles.input}
            placeholder="Email or phone number"
            placeholderTextColor={'#9CA3AF'}
            maxLength={10}
            returnKeyType="done"
            clearButtonMode="while-editing"
            keyboardType="name-phone-pad"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
          <TextInput
            style={screenStyles.input}
            placeholder="Password"
            placeholderTextColor={'#9CA3AF'}
            maxLength={10}
            returnKeyType="done"
            clearButtonMode="while-editing"
            keyboardType="visible-password"
            secureTextEntry={true}
            value={pwd}
            onChangeText={text => setPwd(text)}
          />

          <TouchableOpacity
            style={screenStyles.loginButton}
            onPress={handleLogin}>
            <Text style={screenStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={screenStyles.bottomSection}>
          <Text style={screenStyles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text style={screenStyles.regtxt}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderRegisterForm = () => {
    return (
      <View style={screenStyles.container}>
        <View style={screenStyles.topSection}>
          <Image source={CONST.APP_LOGO_ICON} style={screenStyles.logo} />
          <Text style={screenStyles.loginText}>Create Account</Text>
        </View>

        <View style={screenStyles.formSection}>
          <TextInput
            style={screenStyles.input}
            placeholder="Full Name"
            placeholderTextColor={'#9CA3AF'}
            returnKeyType="next"
            clearButtonMode="while-editing"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={screenStyles.input}
            placeholder="Phone Number"
            placeholderTextColor={'#9CA3AF'}
            maxLength={10}
            returnKeyType="next"
            clearButtonMode="while-editing"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
          <TextInput
            style={screenStyles.input}
            placeholder="Email"
            placeholderTextColor={'#9CA3AF'}
            returnKeyType="next"
            clearButtonMode="while-editing"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={screenStyles.input}
            placeholder="Address"
            placeholderTextColor={'#9CA3AF'}
            returnKeyType="next"
            clearButtonMode="while-editing"
            value={address}
            onChangeText={text => setAddress(text)}
          />
          <TextInput
            style={screenStyles.input}
            placeholder="Create Password"
            placeholderTextColor={'#9CA3AF'}
            returnKeyType="done"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            value={pwd}
            onChangeText={text => setPwd(text)}
          />

          <TouchableOpacity
            style={screenStyles.loginButton}
            onPress={handleRegister}>
            <Text style={screenStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={screenStyles.bottomSection}>
          <Text style={screenStyles.registerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text style={screenStyles.regtxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === CONST.PLATFORM_IOS ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === CONST.PLATFORM_IOS ? 64 : 0}
        style={screenStyles.keyboardAvoid}
        enabled={true}>
        <ScrollView
          contentContainerStyle={screenStyles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          {isLogin ? renderLoginForm() : renderRegisterForm()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

};

export default LoginScreenComponent;