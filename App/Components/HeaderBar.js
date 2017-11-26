import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
// import styles from './Styles/HeaderBarStyle'
import { Header, Left, Body, Right, Button, Icon, Text } from 'native-base'
import {Colors, Fonts} from '../Themes/'
import { NavigationActions } from 'react-navigation'
import { ModalMore } from './ModalMore'
import { ModalConfirm } from './ModalConfirm'

export default class HeaderBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isConfirm: false,
      isMore: false
    }
  }

  _onPressSave () {
    if (typeof this.props.onSave === 'function') {
      this.props.onSave()
    }
  }

  _onPressEdit () {
    this.setState({
      isMore: false
    })
    if (typeof this.props.onEdit === 'function') {
      this.props.onEdit()
    }
  }

  _onPressDelete () {
    this.setState({
      isMore: false,
      isConfirm: true
    })
  }

  _onConfirmDelete () {
    this.setState({
      isConfirm: false
    })
    if (typeof this.props.onDelete === 'function') {
      this.props.onDelete()
    }
  }

  _onCancelDelete () {
    this.setState({
      isConfirm: false
    })
  }

  render () {
    const props = this.props
    return (
      <Header androidStatusBarColor={Colors.primaryColor3} style={{backgroundColor: Colors.primaryColor3}} >
        <ModalMore visible={this.state.isMore} onClose={() => this.setState({isMore: false})} onPressEdit={this._onPressEdit.bind(this)} onPressDelete={this._onPressDelete.bind(this)} />
        <ModalConfirm visible={this.state.isConfirm} onClose={() => this.setState({isConfirm: false})} onConfirmDelete={this._onConfirmDelete.bind(this)} onCancelDelete={this._onCancelDelete.bind(this)} />
        <Left style={[props.confirm && {flex: 0.7}]}>
          {props.confirm
          ? <TouchableOpacity transparent onPress={() => props.navigation.dispatch(NavigationActions.back({key: null}))}>
            <Text style={{fontSize: Fonts.size.regular, color: Colors.white}}>cancel</Text>
          </TouchableOpacity>
          : <Button transparent onPress={() => props.navigation.dispatch(NavigationActions.back({key: null}))}>
            <Icon name='arrow-back' />
          </Button>}
        </Left>
        <Body style={[{flexGrow: 1}, props.confirm && {justifyContent: 'center', alignItems: 'center'}]}>
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={{color: Colors.white, fontSize: Fonts.size.regular, fontWeight: 'bold'}}>{props.title}</Text>
        </Body>
        <Right style={[props.confirm && {flex: 0.7}]}>
          {props.confirm
          ? <TouchableOpacity disabled={this.props.saveDisable} onPress={this._onPressSave.bind(this)}>
            <Text style={{fontSize: Fonts.size.regular, color: this.props.saveDisable ? Colors.charcoal : Colors.white}}>save</Text>
          </TouchableOpacity>
          : <Button transparent onPress={() => this.setState({isMore: true})}>
            <Icon name='more' />
          </Button> }
        </Right>
      </Header>
    )
  }
}

Header.defaultProps = {
  saveDisable: true
}
