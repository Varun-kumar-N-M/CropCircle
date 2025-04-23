import {Platform, StyleSheet} from 'react-native';
import * as CONST from '../../utils/Constants';
import scale from '../../utils/Scale';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: scale(20),
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    marginTop: scale(40),
  },
  formSection: {
    width: '100%',
    alignItems: 'center',
    marginVertical: scale(20),
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  logo: {
    width: scale(80),
    height: scale(80),
    marginBottom: scale(20),
  },
  loginText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: scale(10),
  },
  appName: {
    fontSize: scale(16),
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: scale(20),
  },
  input: {
    width: '100%',
    padding: scale(12),
    borderWidth: scale(1),
    borderColor: '#9CA3AF',
    color: '#1F2937',
    borderRadius: scale(8),
    fontSize: scale(16),
    marginBottom: scale(15),
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: scale(15),
    backgroundColor: '#4A8B2C',
    borderRadius: scale(8),
    marginTop: scale(10),
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  registerText: {
    fontSize: scale(16),
    fontWeight: '400',
    color: '#6B7280',
  },
  regtxt: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#4A8B2C',
  },
});
export default styles;
