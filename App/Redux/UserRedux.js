import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUserListRequest: ['data'],
  getUserListSuccess: ['payload'],
  getUserListFailure: ['error'],

  getUserDetailRequest: ['data'],
  getUserDetailSuccess: ['payload'],
  getUserDetailFailure: ['error'],

  createUserRequest: ['data'],
  createUserSuccess: ['payload'],
  createUserFailure: ['error'],

  updateUserInfoRequest: ['data'],
  updateUserInfoSuccess: ['payload'],
  updateUserInfoFailure: ['error'],

  deleteUserRequest: ['data'],
  deleteUserSuccess: ['payload'],
  deleteUserFailure: ['error'],

  uploadUserPhotoRequest: ['data'],
  uploadUSerPhotoSuccess: ['payload'],
  uploadUserPhotoFailure: ['error']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userList: {fetching: null, data: null, error: null, payload: null},
  userDetail: {fetching: null, data: null, error: null, payload: null},
  createUser: {fetching: null, data: null, error: null, payload: null},
  updateUser: {fetching: null, data: null, error: null, payload: null},
  deleteUser: {fetching: null, data: null, error: null, payload: null},
  uploadPhoto: {fetching: null, data: null, error: null, payload: null}
})

/* ------------- Reducers ------------- */

export const getUserListRequest = (state, {data}) =>
state.merge({...state, userList: {...state.userList, fetching: true, data}})
export const getUserListSuccess = (state, {payload}) =>
state.merge({...state, userList: {...state.userList, fetching: false, error: null, payload}})
export const getUserListFailure = (state, {error}) =>
state.merge({...state, userList: {...state.userList, fetching: false, error}})

export const getUserDetailRequest = (state, {data}) =>
state.merge({...state, userDetail: {...state.userDetail, fetching: true, data}})
export const getUserDetailSuccess = (state, {payload}) =>
state.merge({...state, userDetail: {...state.userDetail, fetching: false, error: null, payload}})
export const getUserDetailFailure = (state, {error}) =>
state.merge({...state, userDetail: {...state.userDetail, fetching: false, error}})

export const createUserRequest = (state, {data}) =>
state.merge({...state, createUser: {...state.createUser, fetching: true, data}})
export const createUserSuccess = (state, {payload}) => {
  let newUserlistPayload = state.userList.payload
  if (newUserlistPayload) {
    newUserlistPayload = {
      ...newUserlistPayload,
      data: [
        ...newUserlistPayload.data,
        payload.data
      ]
    }
  }
  return state.merge({...state,
    createUser: {...state.createUser, fetching: false, error: null, payload},
    userList: {...state.userList, fetching: false, error: null, payload: newUserlistPayload}
  })
}
export const createUserFailure = (state, {error}) =>
state.merge({...state, createUser: {...state.createUser, fetching: false, error}})

export const updateUserInfoRequest = (state, {data}) =>
state.merge({...state, updateUser: {...state.updateUser, fetching: true, data}})
export const updateUserInfoSuccess = (state, {payload}) => {
  let newUserlistPayload = state.userList.payload

  if (newUserlistPayload) {
    const index = newUserlistPayload.data.findIndex(item => item.id === state.updateUser.data.id)
    if (index >= 0) {
      const oldData = newUserlistPayload.data[index]
      const newData = {
        ...oldData,
        ...payload.data
      }
      console.tron.warn(newData)
      const newListData = [...newUserlistPayload.data]
      newListData.splice(index, 1, newData)
      console.tron.warn(newListData)
      newUserlistPayload = {
        ...newUserlistPayload,
        data: newListData
      }
    }
  }

  console.tron.warn(newUserlistPayload)
  return state.merge({...state,
    updateUser: {...state.updateUser, fetching: false, error: null, payload},
    userList: {...state.userList, fetching: false, error: null, payload: newUserlistPayload}
  })
}
export const updateUserInfoFailure = (state, {error}) =>
state.merge({...state, updateUser: {...state.updateUser, fetching: false, error}})

export const deleteUserRequest = (state, {data}) =>
state.merge({...state, deleteUser: {...state.deleteUser, fetching: true, data}})
export const deleteUserSuccess = (state, {payload}) => {
  let newUserlistPayload = state.userList.payload
  if (newUserlistPayload) {
    newUserlistPayload = {
      ...newUserlistPayload,
      data: [...newUserlistPayload.data].filter(item => item.id !== state.deleteUser.data.id)
    }
  }
  return state.merge({...state,
    deleteUser: {...state.deleteUser, fetching: false, error: null, payload},
    userList: {...state.userList, fetching: false, error: null, payload: newUserlistPayload}
  })
}
export const deleteUserFailure = (state, {error}) =>
state.merge({...state, deleteUser: {...state.deleteUser, fetching: false, error}})

export const uploadUserPhotoRequest = (state, {data}) =>
state.merge({...state, uploadPhoto: {...state.uploadPhoto, fetching: true, data}})
export const uploadUserPhotoSuccess = (state, {payload}) => {
  let newUserlistPayload = state.userList.payload

  if (newUserlistPayload) {
    const index = newUserlistPayload.data.findIndex(item => item.id === state.uploadPhoto.data.id)
    if (index >= 0) {
      const oldData = newUserlistPayload.data[index]
      const newData = {
        ...oldData,
        ...payload.data
      }
      const newListData = [...newUserlistPayload.data]
      newListData.splice(index, 1, newData)
      newUserlistPayload = {
        ...newUserlistPayload,
        data: newListData
      }
    }
  }

  console.tron.warn(newUserlistPayload)
  return state.merge({...state,
    uploadPhoto: {...state.uploadPhoto, fetching: false, error: null, payload},
    userList: {...state.userList, fetching: false, error: null, payload: newUserlistPayload}
  })
}
export const uploadUserPhotoFailure = (state, {error}) =>
state.merge({...state, uploadPhoto: {...state.uploadPhoto, fetching: false, error}})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER_LIST_REQUEST]: getUserListRequest,
  [Types.GET_USER_LIST_SUCCESS]: getUserListSuccess,
  [Types.GET_USER_LIST_FAILURE]: getUserListFailure,

  [Types.GET_USER_DETAIL_REQUEST]: getUserDetailRequest,
  [Types.GET_USER_DETAIL_SUCCESS]: getUserDetailSuccess,
  [Types.GET_USER_DETAIL_FAILURE]: getUserDetailFailure,

  [Types.CREATE_USER_REQUEST]: createUserRequest,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_FAILURE]: createUserFailure,

  [Types.UPDATE_USER_INFO_REQUEST]: updateUserInfoRequest,
  [Types.UPDATE_USER_INFO_SUCCESS]: updateUserInfoSuccess,
  [Types.UPDATE_USER_INFO_FAILURE]: updateUserInfoFailure,

  [Types.DELETE_USER_REQUEST]: deleteUserRequest,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.DELETE_USER_FAILURE]: deleteUserFailure,

  [Types.UPLOAD_USER_PHOTO_REQUEST]: uploadUserPhotoRequest,
  [Types.UPLOAD_USER_PHOTO_SUCCESS]: uploadUserPhotoSuccess,
  [Types.UPLOAD_USER_PHOTO_FAILURE]: uploadUserPhotoFailure
})
