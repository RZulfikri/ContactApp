import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserActions from '../Redux/UserRedux'

import { Container, Content, Body, Form, Label, Input } from 'native-base'
import HeaderBar from '../Components/HeaderBar'
import {Avatar} from '../Components/Avatar'
import {Item} from '../Components/Item'
import {ModalSelectPhoto} from '../Components/ModalSelectPhoto'
import { Fonts, Colors, Metrics } from '../Themes/index'

// Styles
// import styles from './Styles/ContactAddScreenStyle'

const styles = {
  labelStyle: {fontSize: Fonts.size.regular, flex: 1, flexGrow: 1, width: Metrics.screenWidth - 34}
}

class ContactAddScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      occupation: '',
      photo: {
        path: null,
        type: 'image/jpeg'
      },
      userId: null,
      saveDisable: true,
      isFetching: false,
      isEdit: false,
      isSelectPhoto: false,
      isSelectedPhoto: false
    }
  }

  componentDidMount () {
    if (this.props.navigation.state.params) {
      const userData = this.props.navigation.state.params.userData
      if (userData) {
        this.setState({
          userId: userData.id,
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          occupation: userData.occupation || '',
          photo: {
            path: userData.photo,
            type: 'image/jpeg'
          },
          isEdit: true
        })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.addUser.fetching && this.state.isFetching && !this.state.isEdit) {
      if (nextProps.addUser.payload) {
        this.props.navigation.dispatch(NavigationActions.back({key: null}))
      }
      if (nextProps.addUser.error) {
        console.tron.warn('error')
      }
      this.setState({isFetching: false})
    }

    if (!nextProps.editUser.fetching && this.state.isFetching && this.state.isEdit) {
      if (nextProps.editUser.payload) {
        this.props.navigation.dispatch(NavigationActions.back({key: null}))
      }
      if (nextProps.editUser.error) {
        console.tron.warn('error')
      }
      this.setState({isFetching: false})
    }
  }

  _focusInput (inputField) {
    this[inputField]._root.focus()
  }

  _onSubmit () {
    const {userId, firstName, lastName, email, phone, occupation, isEdit, isSelectedPhoto, photo} = this.state
    let data = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      occupation
    }

    if (isSelectedPhoto) {
      data = {
        ...data,
        photo
      }
    }
    this.setState({isFetching: true})
    if (isEdit) {
      data = {
        id: userId,
        ...data
      }

      this.props.doEditUser(data)
    } else {
      this.props.doAddUser(data)
    }
  }

  _onChangeText (type, text) {
    let data = {}
    let {firstName, lastName, email, phone, occupation} = this.state
    switch (type) {
      case 'first_name':
        firstName = text
        data = {firstName}
        break
      case 'last_name' :
        lastName = text
        data = {lastName}
        break
      case 'phone':
        phone = text
        data = {phone}
        break
      case 'email':
        email = text
        data = {email}
        break
      case 'occupation':
        occupation = text
        data = {occupation}
        break
    }
    if ((firstName.length > 0 || lastName.length > 0) && (email.length > 0 || phone.length > 0)) {
      data = {
        ...data,
        saveDisable: false
      }
    } else {
      data = {
        ...data,
        saveDisable: true
      }
    }
    this.setState({
      ...data
    })
  }

  _onResult (result) {
    // console.tron.warn(result)
    let {firstName, lastName, email, phone} = this.state
    const saveDisable = !((firstName.length > 0 || lastName.length > 0) && (email.length > 0 || phone.length > 0))
    this.setState({
      isSelectPhoto: false,
      isSelectedPhoto: true,
      saveDisable,
      photo: {
        path: result.path,
        type: result.mime
      }
    })
  }

  render () {
    return (
      <Container style={{backgroundColor: Colors.white}}>
        <ModalSelectPhoto visible={this.state.isSelectPhoto} onClose={() => this.setState({isSelectPhoto: false})} onResult={this._onResult.bind(this)} />
        <HeaderBar {...this.props} confirm title={this.state.isEdit ? 'Edit Contact' : 'Add Contact'} saveDisable={this.state.saveDisable} onSave={this._onSubmit.bind(this)} />
        <Content style={{flex: 1}}>
          <Content style={{top: 20}}>
            <Body>
              <TouchableOpacity onPress={() => this.setState({isSelectPhoto: true})}>
                <Avatar size={100} source={this.state.photo.path && {uri: this.state.photo.path}} />
              </TouchableOpacity>
            </Body>
          </Content>
          <Form>
            <Item stackedLabel={this.state.isEdit} floatingLabel={!this.state.isEdit}>
              <Label style={styles.labelStyle}>First Name</Label>
              <Input style={styles.labelStyle}
                // placeholder={'First name'}
                onSubmitEditing={() => this._focusInput('lastName')}
                returnKeyType={'next'}
                onChangeText={this._onChangeText.bind(this, 'first_name')}
                value={this.state.firstName}
                maxLength={20}
              />
            </Item>
            <Item stackedLabel={this.state.isEdit} floatingLabel={!this.state.isEdit}>
              <Label style={styles.labelStyle}>Last Name</Label>
              <Input style={styles.labelStyle}
                // placeholder={'Last name'}
                getRef={input => { this.lastName = input }}
                onSubmitEditing={() => this._focusInput('phone')}
                returnKeyType={'next'}
                onChangeText={this._onChangeText.bind(this, 'last_name')}
                value={this.state.lastName}
                maxLength={20}
              />
            </Item>
            <Item stackedLabel={this.state.isEdit} floatingLabel={!this.state.isEdit}>
              <Label style={styles.labelStyle}>Phone</Label>
              <Input style={styles.labelStyle}
                // placeholder={'Phone'}
                getRef={input => { this.phone = input }}
                onSubmitEditing={() => this._focusInput('email')}
                keyboardType={'phone-pad'}
                returnKeyType={'next'}
                onChangeText={this._onChangeText.bind(this, 'phone')}
                value={this.state.phone}
                maxLength={13}
              />
            </Item>
            <Item stackedLabel={this.state.isEdit} floatingLabel={!this.state.isEdit}>
              <Label style={styles.labelStyle}>Email</Label>
              <Input style={styles.labelStyle}
                // placeholder={'Email'}
                getRef={input => { this.email = input }}
                onSubmitEditing={() => this._focusInput('occupation')}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                onChangeText={this._onChangeText.bind(this, 'email')}
                value={this.state.email}
                maxLength={50}
              />
            </Item>
            <Item stackedLabel={this.state.isEdit} floatingLabel={!this.state.isEdit}>
              <Label style={styles.labelStyle}>Occupation</Label>
              <Input style={styles.labelStyle}
                // placeholder={'Occupation'}
                getRef={input => { this.occupation = input }}
                returnKeyType={'done'}
                onChangeText={this._onChangeText.bind(this, 'occupation')}
                value={this.state.occupation}
                maxLength={50}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addUser: state.user.createUser,
    editUser: state.user.updateUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doAddUser: (data) => dispatch(UserActions.createUserRequest(data)),
    doEditUser: (data) => dispatch(UserActions.updateUserInfoRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactAddScreen)
