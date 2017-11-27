import React from 'react'
// import PropTypes from 'prop-types';
// import styles from './Styles/ListItemStyle'
import { ListItem as NativeBaseListItem, View } from 'native-base'
import {Colors} from '../Themes'

export const ListItem = (props) => (
  <View style={{backgroundColor: '#FFFFFF'}} >
    <NativeBaseListItem style={{borderBottomWidth: props.lastRow ? 1 : 1, marginLeft: 0, paddingHorizontal: 17, borderBottomColor: props.lastRow ? Colors.backgroundGray : Colors.primaryColor3}} {...props} />
  </View>
)

// export default class ListItem extends Component {
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
//         <Text>ListItem Component</Text>
//       </View>
//     )
//   }
// }
