import React from 'react'
// import PropTypes from 'prop-types';
import { Modal, View, TouchableWithoutFeedback } from 'react-native'
import styles from './Styles/ModalConfirmStyle'
import { Text, Button, Right, Left } from 'native-base'
import {Colors, Fonts} from '../Themes/'

export const ModalConfirm = (props) => {
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
                <Text style={{fontSize: Fonts.size.h6}}>Are you sure want to delete ?</Text>
                <View style={{flexDirection: 'row'}}>
                  <Left>
                    <Button transparent onPress={() => { typeof props.onCancelDelete === 'function' && props.onCancelDelete() }}>
                      <Text style={{color: Colors.primaryColor2}} >No</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Button transparent onPress={() => { typeof props.onConfirmDelete === 'function' && props.onConfirmDelete() }}
                      >
                      <Text style={{color: Colors.primaryColor2}}>Yes</Text>
                    </Button>
                  </Right>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
