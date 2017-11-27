import React from 'react'
// import PropTypes from 'prop-types';
// import { View, Text } from 'react-native'
import { Left, Text, Body, View } from 'native-base'
import { ListItem } from '../Components/ListItem'
// import styles from './Styles/ContactRowStyle'
import {Avatar} from './Avatar'

export const ContactRow = (props) => (
  <View style={{elevation: 5, flex: 1}}>
    <ListItem avatar onPress={props.onPress} lastRow={props.lastRow}>
      <Left>
        <Avatar size={80} source={props.userData.photo && {uri: props.userData.photo}} />
      </Left>
      <Body style={{borderBottomWidth: 0}} >
        <Text>{props.userData.first_name + ' ' + props.userData.last_name}</Text>
        <Text note>{props.userData.phone}</Text>
      </Body>
    </ListItem>
  </View>
)
