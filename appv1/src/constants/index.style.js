import {StyleSheet} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',

  background1: '#e3b0bd',
  background2: '#6b6b83',
  background3: '#98c6cd',
  // ['#e3b0bd', '#6b6b83', '#98c6cd']
  // background1Header: '#8f8796',
  // background2Header: '#6b6b83',
  // background3Header: '#4389A2',
  //
  background1Header: '#839ea9',
  background2Header: '#839ea9',
  background3Header: '#e3b0bd',

  // background1Login: '#e3b0bd',
  // background2Login: '#6b6b83',
  // background3Login: '#98c6cd',

  background1Login: '#98c6cd',
  background2Login: '#6b6b83',
  background3Login: '#e3b0bd',
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    paddingVertical: 30,
  },
  exampleContainerDark: {
    backgroundColor: colors.black,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleDark: {
    color: colors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'red',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
