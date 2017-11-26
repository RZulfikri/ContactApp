import React from 'react'
// import PropTypes from 'prop-types';
import { Image } from 'react-native'
// import styles from './Styles/AvatarStyle'
import { Thumbnail } from 'native-base'

export const Avatar = (props) => {
  if (props.source) {
    if (props.size > 80) return <Image style={{width: props.size, height: props.size, borderRadius: props.size / 2}} {...props} />
    else return <Thumbnail circular {...props} />
  } else {
    if (props.size > 80) return <Image {...props} style={{width: props.size, height: props.size, borderRadius: props.size / 2}} source={require('../Images/Icons/placeholder-profile.png')} />
    else return <Thumbnail circular {...props} source={require('../Images/Icons/placeholder-profile.png')} />
  }
}

// export default class Avatar extends Component {
//   // // Prop type warnings
//   // static propTypes = {
//   //   someProperty: PropTypes.object,
//   //   someSetting: PropTypes.bool.isRequired,
//   // }
//   //
//   // // Defaults for props
//   // static defaultProps = {
//   //   someSetting: false
//   // }

//   render () {
//     return (
//       <View style={styles.container}>
//         <Text>Avatar Component</Text>
//       </View>
//     )
//   }
// }
