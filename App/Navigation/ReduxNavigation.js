import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import { BackHandler } from "react-native";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import AppNavigation from './AppNavigation'

// here is our redux-aware our smart component

class ReduxNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    });

    return <AppNavigation navigation={navigation} />;
  }
}

// function ReduxNavigation (props) {
//   const { dispatch, nav } = props
//   const navigation = ReactNavigation.addNavigationHelpers({
//     dispatch,
//     state: nav
//   })

//   return <AppNavigation navigation={navigation} />
// }

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
