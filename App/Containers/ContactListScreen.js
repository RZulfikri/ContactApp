import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { Container, Icon, Fab } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserActions from '../Redux/UserRedux'

import {ContactRow} from '../Components/ContactRow'
import {SearchBar} from '../Components/SearchBar'
import { Colors } from '../Themes';

// Styles
// import styles from './Styles/ContactListScreenStyle'

class ContactListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userList: [],
      refreshing: true,
      search: ''
    }
  }

  componentDidMount () {
    this.props.getUserList()
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.userList.fetching) {
      if (nextProps.userList.payload) {
        this.setState({userList: [...nextProps.userList.payload.data], refreshing: false})
      } else {
        this.setState({refreshing: false})
      }
    }
  }

  _onRefresh () {
    this.setState({refreshing: true})
    this.props.getUserList()
  }

  _onClear () {
    this.setState({search: '', userList: this.props.userList.payload.data})
  }

  _onSearch (text) {
    let newUserList = []
    if (this.props.userList.payload) {
      newUserList = [...this.props.userList.payload.data].filter(item => {
        const firstName = item.first_name.toLowerCase()
        const lastName = item.last_name.toLowerCase()
        const newText = text.toLowerCase()
        const phone = item.phone.toLowerCase()
        return firstName.includes(newText) || lastName.includes(newText) || phone.includes(newText)
      })
    }
    this.setState({search: text, userList: newUserList})
  }

  render () {
    const {navigate} = this.props.navigation

    return (
      <Container>
        <SearchBar
          onChangeText={this._onSearch.bind(this)}
          value={this.state.search}
          onClear={this._onClear.bind(this)}
        />
        <FlatList
          data={this.state.userList}
          keyExtractor={(item, index) => index}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          renderItem={({item, index}) => {
            return <ContactRow key={index} userData={item} onPress={() => navigate('ContactDetailScreen', {userData: item})} />
          }}
        />
        <Fab
          direction='up'
          containerStyle={{ }}
          style={{ backgroundColor: Colors.primaryColor4 }}
          position='bottomRight'
          onPress={() => navigate('ContactAddScreen')}>
          <Icon name='add' />
        </Fab>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.user.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: () => dispatch(UserActions.getUserListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactListScreen)
