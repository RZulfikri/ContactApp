import React from 'react'
// import PropTypes from 'prop-types';
import { Modal, View, TouchableWithoutFeedback } from 'react-native'
import styles from './Styles/ModalMoreStyle'
import { Text, Icon, Header, Button, Right } from 'native-base'
import { ListItem } from './ListItem'
import {Colors} from '../Themes/'

export const ModalMore = (props) => {
  return (
    <Modal
      transparent visible={props.visible}
      onRequestClose={props.onClose}
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={styles.overlayStyle}>
          <TouchableWithoutFeedback>
            <View style={styles.containerMain}>
              <View style={styles.containerContent}>
                <Header style={{backgroundColor: Colors.white}} androidStatusBarColor={Colors.white} noShadow>
                  <Right>
                    <Button transparent onPress={props.onClose}>
                      <Icon name='close' style={{color: 'black'}} />
                    </Button>
                  </Right>
                </Header>
                <ListItem onPress={() => {
                  typeof props.onPressEdit === 'function' && props.onPressEdit()
                }}>
                  <Text>Edit</Text>
                </ListItem>
                <View style={{height: 1, backgroundColor: Colors.cloud}} />
                <ListItem lastRow onPress={() => {
                  typeof props.onPressDelete === 'function' && props.onPressDelete()
                }}>
                  <Text>Delete</Text>
                </ListItem>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
