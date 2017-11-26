import React from 'react'
// import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import { Header, Item, Input, Icon, Button, Text, Right } from 'native-base'
// import styles from './Styles/SearchBarStyle'
import {Colors} from '../Themes'

export const SearchBar = (props) => (
  <Header searchBar rounded androidStatusBarColor={Colors.primaryColor3} style={{backgroundColor: Colors.primaryColor3}} >
    <Item style={{alignItems: 'center'}} >
      <Icon name='ios-search' />
      <Input placeholder='Search' {...props} />
      {props.value.length > 0 && <Right style={{marginHorizontal: 10, flex: 0}}>
        <TouchableOpacity onPress={props.onClear}>
          <Icon name='close' style={{fontSize: 20}} />
        </TouchableOpacity>
      </Right>}
    </Item>
    <Button transparent>
      <Text>Search</Text>
    </Button>
  </Header>
)

// export default class SearchBar extends Component {
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
//         <Text>SearchBar Component</Text>
//       </View>
//     )
//   }
// }
