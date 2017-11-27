import React from 'react'
// import PropTypes from 'prop-types';
import { Modal, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import styles from './Styles/ModalSelectPhotoStyle'
import { Text } from 'native-base'
import {Colors} from '../Themes/'
import ImagePicker from 'react-native-image-crop-picker'

const openCamera = (callback) => {
  // console.tron.warn('open camera')
  ImagePicker.openCamera({
    width: 1024,
    height: 1024,
    cropping: true
  }).then(image => {
    if (typeof callback === 'function') {
      callback(image)
    }
  })
}

const openGallery = (callback) => {
  // console.tron.warn('open gallery')
  ImagePicker.openPicker({
    width: 1024,
    height: 1024,
    cropping: true
  }).then((image) => {
    if (typeof callback === 'function') {
      callback(image)
    }
  })
}

export const ModalSelectPhoto = (props) => {
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
                <TouchableOpacity onPress={() => openCamera(props.onResult)}>
                  <Text style={{padding: 10, color: Colors.primaryColor2}}>Select from camera</Text>
                </TouchableOpacity>
                <View style={{height: 1, backgroundColor: Colors.cloud}} />
                <TouchableOpacity onPress={() => openGallery(props.onResult)}>
                  <Text style={{padding: 10, color: Colors.primaryColor2}}>Select from gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
