import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1
  },
  overlayStyle: {
    width,
    height,
    backgroundColor: 'transparent'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  containerMain: {
    width: width,
    elevation: 10,
    // height: height * 0.3,
    backgroundColor: 'rgba(255,255,255,1)'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  containerContent: {

  }
})
