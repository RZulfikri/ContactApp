import React from 'react'
// import PropTypes from 'prop-types';
import {Item as NativeBaseItem} from 'native-base'
// import styles from './Styles/ItemStyle'
import { Metrics } from '../Themes/index'

export const Item = (props) => (
  <NativeBaseItem style={{width: Metrics.screenWidth - 34}} {...NativeBaseItem.props} {...props} />
)
