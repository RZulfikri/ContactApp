import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import UserActions from '../Redux/UserRedux'

import { Container, Content, Text, List, View, Icon } from 'native-base'
import { ListItem } from '../Components/ListItem'
import HeaderBar from '../Components/HeaderBar'
import {Avatar} from '../Components/Avatar'
import { Colors, Metrics } from '../Themes/index'
import LinearGradient from 'react-native-linear-gradient'

class ContactDetailScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userDetail: props.navigation.state.params.userData,
      isDelete: false
    }
  }

  _onPressEdit () {
    const {navigate} = this.props.navigation
    navigate('ContactAddScreen', {userData: this.state.userDetail})
  }

  _onPressDelete () {
    this.props.doDelete(this.state.userDetail)
    this.setState({isDelete: true})
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.userList.fetching) {
      if (nextProps.userList.payload) {
        // this.setState({userList: nextProps.userList.payload.data, refreshing: false})
        const data = nextProps.userList.payload.data.filter(item => item.id === this.state.userDetail.id)
        // console.tron.warn(data)
        this.setState({
          userDetail: {...data[0]}
        })
      }
    }

    if (!nextProps.deleteUser.fetching && this.state.isDelete) {
      if (nextProps.deleteUser.payload) {
        this.props.navigation.dispatch(NavigationActions.back({key: null}))
      }
    }
  }

  shuffle (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o
  }

  getColor (number) {
    switch (number) {
      case 1: return Colors.white
      case 2: return Colors.primaryColor1
      case 3: return Colors.primaryColor2
      case 4: return Colors.primaryColor3
      case 5: return Colors.primaryColor4
      case 6: return Colors.primaryColor5
    }
  }

  generateBackgroundColor () {
    const numbers = [2, 3, 4, 5, 6]
    const rand = this.shuffle(numbers)

    const data = {
      first: this.getColor(rand[0]),
      second: this.getColor(rand[2]),
      third: this.getColor(rand[3])
    }

    return data
  }

  render () {
    const {userDetail} = this.state
    let gradientColor = null
    if (userDetail.photo) {
    } else {
      gradientColor = this.generateBackgroundColor()
    }
    return (
      <Container>
        <HeaderBar {...this.props} title={userDetail.first_name + ' ' + userDetail.last_name} onEdit={this._onPressEdit.bind(this)} onDelete={this._onPressDelete.bind(this)} />
        <Content >
          {userDetail.photo
          ? <Content>
            <Image source={{uri: userDetail.photo}} style={{width: Metrics.screenWidth, height: Metrics.screenWidth, justifyContent: 'flex-end'}} >
              <View style={{margin: 5, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{backgroundColor: Colors.primaryColor2, color: Colors.white, padding: 10, borderRadius: 5}}>{userDetail.first_name + ' ' + userDetail.last_name}</Text>
              </View>
            </Image>
          </Content>
          : <Content>
            <LinearGradient
              colors={[gradientColor.first, gradientColor.second, gradientColor.third]}
              style={{width: Metrics.screenWidth, height: Metrics.screenWidth, justifyContent: 'flex-end'}}
              start={{x: Math.random(), y: (Math.random() * 0.3) + 0.2}} end={{x: Math.random(), y: (Math.random() * 0.3) + 0.2}}
              locations={[0, 5, 1]}
              >
              <View style={{margin: 15, flexDirection: 'row', alignItems: 'center'}}>
                <Avatar size={60} />
                <Text style={{padding: 15, color: Colors.white}}>{userDetail.first_name + ' ' + userDetail.last_name}</Text>
              </View>
            </LinearGradient>
          </Content>}
          <List style={{backgroundColor: Colors.white}}>
            <ListItem>
              <Icon name='phone-portrait' style={styles.iconStyle} />
              <Text>{userDetail.phone}</Text>
            </ListItem>
            <ListItem>
              <Icon name='mail' style={styles.iconStyle} />
              <Text>{userDetail.email}</Text>
            </ListItem>
            <ListItem>
              <Icon name='person' style={styles.iconStyle} />
              <Text>{userDetail.occupation}</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

const styles = {
  iconStyle: {
    marginRight: 7.5,
    width: 30,
    color: Colors.primaryColor5
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.user.userList,
    deleteUser: state.user.deleteUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doDelete: (data) => dispatch(UserActions.deleteUserRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailScreen)
