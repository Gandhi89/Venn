import { colors } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flexGrow: 1
  },
  root: {
    marginTop: 16
  },
  rootLandscape: {
    paddingHorizontal: 30,
    paddingBottom: 30
  },
  stepText: {
    fontSize: 14,
    color: colors.slate,
    marginTop: 16,
    marginLeft: 10,
    alignSelf: 'center'
  },
  heading: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 10,
    alignSelf: 'center',
    paddingTop: 24
  },
  inputHeader: {
    marginBottom: 4,
    marginLeft: 10,
    fontSize: 14,
    color: colors.black,
    fontWeight: '400',
    marginTop: 16
  },
  charCount: {
    alignSelf: 'flex-end',
    marginRight: 10,
    fontSize: 12,
    color: colors.slate,
    marginTop: -20
  },
  buttonContainer: {
    marginTop: 16,
    marginHorizontal: 10
  },
  iconContainer: {
    marginLeft: 4 
  },
  submitError: {
    color: colors.error,
    marginTop: 16,
    marginBottom: -8,
    marginLeft: 10,
    alignSelf: 'center'
  }
})