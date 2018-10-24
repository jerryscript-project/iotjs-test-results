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

import { createAction, handleActions } from 'redux-actions';
import { deviceResultDatabase } from '../../../firebase';

// Initial state
export const initialState = {
  loading: true,
  project: '',
  device: '',
  measurements: [],
  error: null,
};

// Action types
export const FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST = 'FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST';
export const FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS = 'FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS';
export const FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE = 'FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE';
export const RESET_DEVICE_DATA_STATE = 'RESET_DEVICE_DATA_STATE';

// Action creators
export const fetchDeviceDataMeasurementsRequest = createAction(
  FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST,
  (project, device) => ({ project, device })
);

export const fetchDeviceDataMeasurementsSuccess = createAction(
  FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS,
  (project, device, measurements) => ({ project, device, measurements })
);

export const fetchDeviceDataMeasurementsFailure = createAction(
  FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE,
  (project, device, error) => ({ project, device, error })
);

export const resetDeviceDataState = createAction(
  RESET_DEVICE_DATA_STATE
);

// Selectors
export const getDeviceDataLoading = state => state.device.data.loading;
export const getDeviceDataMeasurements = state => state.device.data.measurements;
export const getDeviceDataError = state => state.device.data.error;

// Reducer
export const reducer = handleActions(
  {
    [fetchDeviceDataMeasurementsRequest]: (state, { payload: { project, device } }) => ({
      ...state,
      loading: true,
      project,
      device
    }),
    [fetchDeviceDataMeasurementsSuccess]: (state, { payload: { project, device, measurements } }) => ({
      ...state,
      loading: false,
      project,
      device,
      measurements
    }),
    [fetchDeviceDataMeasurementsFailure]: (state, { payload: { project, device, error } }) => ({
      ...state,
      loading: false,
      project,
      device,
      error
    }),
    [resetDeviceDataState]: () => initialState
  },
  initialState
);

// Async action creators
export const fetchDeviceDataMeasurements = (project, device) => dispatch => {
  dispatch(fetchDeviceDataMeasurementsRequest(project, device));

  deviceResultDatabase(project, device).then(snapshot => {
    let measurements = [];
    snapshot.forEach(child => {
      measurements = [...measurements, child.val()];
    });

    dispatch(fetchDeviceDataMeasurementsSuccess(project, device, measurements));
  }, error => {
    dispatch(fetchDeviceDataMeasurementsFailure(project, device, error));
  });
};
