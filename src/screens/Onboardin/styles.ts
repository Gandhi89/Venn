import { colors } from '@/src/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flexGrow: 1
  },
  root: {
    marginTop: 24
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
    marginBottom: 12,
    marginLeft: 10,
    alignSelf: 'center',
    paddingTop: 24
  },
  inputHeader: {
    marginBottom: 4,
    marginLeft: 10,
    fontSize: 14,
    color: colors.black,
    fontWeight: '400'
  },
  button: {
    marginHorizontal: 10
  }
})