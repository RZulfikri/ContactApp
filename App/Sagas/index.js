import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

// import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'
import { getUserList, getUserDetail, createUser, updateUserInfo, deleteUser, uploadUserPhoto } from './UserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
    takeLatest(UserTypes.GET_USER_LIST_REQUEST, getUserList, api),
    takeLatest(UserTypes.GET_USER_DETAIL_REQUEST, getUserDetail, api),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUser, api),
    takeLatest(UserTypes.UPDATE_USER_INFO_REQUEST, updateUserInfo, api),
    takeLatest(UserTypes.DELETE_USER_REQUEST, deleteUser, api),
    takeLatest(UserTypes.UPLOAD_USER_PHOTO_REQUEST, uploadUserPhoto, api)
  ])
}
