/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, all } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { ErrorHandler } from '../Lib/ErrorHandler'

export function * getUserList (api, action) {
  const { data } = action
  const response = yield call(api.getUserList, data)

  if (response.ok) {
    yield put(UserActions.getUserListSuccess(response.data))
  } else {
    ErrorHandler(response)
    yield put(UserActions.getUserListFailure(response))
  }
}

export function * getUserDetail (api, action) {
  const { data } = action
  const response = yield call(api.getUserDetail, data)

  if (response.ok) {
    yield put(UserActions.getUserDetailSuccess(response.data))
  } else {
    ErrorHandler(response)
    yield put(UserActions.getUserDetailFailure(response))
  }
}

export function * createUser (api, action) {
  let data = {...action.data}
  if (data.photo) {
    delete data.photo
  }
  const response = yield call(api.createUser, data)

  if (response.ok) {
    if (action.data.photo) {
      const form = new FormData()
      form.append('file', {
        uri: action.data.photo.path,
        type: action.data.photo.type,
        name: action.data.photo.path
      })

      const param = {
        id: response.data.data.id,
        file: form
      }

      const responseImage = yield call(api.uploadUserPhoto, param)

      if (responseImage.ok) {
        yield put(UserActions.createUserSuccess(responseImage.data))
        // yield put(UserActions.uploadUserPhotoSuccess(responseImage.data))
      } else {
        ErrorHandler(responseImage)
        yield put(UserActions.uploadUserPhotoFailure(responseImage))
      }
    } else {
      yield put(UserActions.createUserSuccess(response.data))
    }
  } else {
    ErrorHandler(response)
    yield put(UserActions.createUserFailure(response))
  }
}

export function * updateUserInfo (api, action) {
  let data = {...action.data}
  if (data.photo) {
    delete data.photo
  }
  const response = yield call(api.updateUserInfo, data)

  if (response.ok) {
    if (action.data.photo) {
      const form = new FormData()
      form.append('file', {
        uri: action.data.photo.path,
        type: action.data.photo.type,
        name: action.data.photo.path
      })

      const param = {
        id: action.data.id,
        file: form
      }

      const responseImage = yield call(api.uploadUserPhoto, param)
      console.tron.warn(responseImage)
      if (responseImage.ok) {
        // yield all([
        //   put(UserActions.updateUserInfoSuccess(responseImage.data)),
        //   put(UserActions.uploadUserPhotoSuccess(responseImage.data))
        // ])
        yield put(UserActions.updateUserInfoSuccess(responseImage.data))
        // yield put(UserActions.uploadUserPhotoSuccess(responseImage))
      } else {
        ErrorHandler(responseImage)
        yield put(UserActions.uploadUserPhotoFailure(responseImage))
      }
    } else {
      yield put(UserActions.updateUserInfoSuccess(response.data))
    }
  } else {
    ErrorHandler(response)
    yield put(UserActions.updateUserInfoFailure(response))
  }
}

export function * deleteUser (api, action) {
  const { data } = action
  const response = yield call(api.deleteUser, data)

  if (response.ok) {
    yield put(UserActions.deleteUserSuccess(response.data))
  } else {
    ErrorHandler(response)
    yield put(UserActions.deleteUserFailure(response))
  }
}

export function * uploadUserPhoto (api, action) {
  const { data } = action
  const response = yield call(api.uploadUserPhoto, data)

  if (response.ok) {
    yield put(UserActions.uploadUserPhotoSuccess(response.data))
  } else {
    ErrorHandler(response)
    yield put(UserActions.uploadUserPhotoFailure(response))
  }
}
