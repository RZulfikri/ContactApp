import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1
  },
  overlayStyle: {
    width,
    height,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerMain: {
    padding: 20,
    width: width * 0.8,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    elevation: 10
  },
  containerContent: {

  }
})
