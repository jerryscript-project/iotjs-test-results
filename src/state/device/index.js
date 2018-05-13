/*
 * Copyright 2018 Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import initialState from './initial.state';
import { deviceResultDatabase } from '../../firebase';

// Action types
export const FETCH_DEVICE_DATA_REQUEST = 'FETCH_DEVICE_DATA_REQUEST';
export const FETCH_DEVICE_DATA_SUCCESS = 'FETCH_DEVICE_DATA_SUCCESS';
export const FETCH_DEVICE_DATA_FAILURE = 'FETCH_DEVICE_DATA_FAILURE';

// Action creators
export const fetchDeviceDataRequest = (project, device) => ({
  type: FETCH_DEVICE_DATA_REQUEST,
  project,
  device,
});

export const fetchDeviceDataSuccess = (project, device, data) => ({
  type: FETCH_DEVICE_DATA_SUCCESS,
  project,
  device,
  data,
});

export const fetchDeviceDataFailure = (project, device, error) => ({
  type: FETCH_DEVICE_DATA_FAILURE,
  project,
  device,
  error,
});

// Async action creators
export const fetchDeviceData = (project, device) => dispatch => {
  dispatch(fetchDeviceDataRequest(project, device));

  deviceResultDatabase(project, device).then(snapshot => {
    const value = snapshot.val();
    const data = value ? value[Object.keys(value)[0]] : null;

    dispatch(fetchDeviceDataSuccess(project, device, data));
  }, error => {
    dispatch(fetchDeviceDataFailure(project, device, error));
  });
};

// Selectors
export const getLoading = state => state.device.loading;
export const getData = state => state.device.data;
export const getError = state => state.device.error;

// Reducers
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_DEVICE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        project: action.project,
        device: action.device,
      };
    case FETCH_DEVICE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.project,
        device: action.device,
        data: action.data,
      };
    case FETCH_DEVICE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        project: action.project,
        device: action.device,
        error: action.error,
      };
    default:
      return state;
  }
};
