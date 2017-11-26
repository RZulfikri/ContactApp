import { StackNavigator } from 'react-navigation'
import ContactAddScreen from '../Containers/ContactAddScreen'
import ContactDetailScreen from '../Containers/ContactDetailScreen'
import ContactListScreen from '../Containers/ContactListScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ContactAddScreen: { screen: ContactAddScreen },
  ContactDetailScreen: { screen: ContactDetailScreen },
  ContactListScreen: { screen: ContactListScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ContactListScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
