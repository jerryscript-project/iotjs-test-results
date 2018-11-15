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

// Initial state
export const initialState = {
  load: true,
  device: '',
  coverage: [],
  error: null,
};

// Action types
export const FETCH_COVERAGE_RESULTS_REQUEST = 'FETCH_COVERAGE_RESULTS_REQUEST';
export const FETCH_COVERAGE_RESULTS_SUCCESS = 'FETCH_COVERAGE_RESULTS_SUCCESS';
export const FETCH_COVERAGE_RESULTS_FAILURE = 'FETCH_COVERAGE_RESULTS_FAILURE';
export const RESET_COVERAGE_DATA_STATE = 'RESET_COVERAGE_DATA_STATE';

// Action creators
export const fetchDeviceCoverageRequest = createAction(
  FETCH_COVERAGE_RESULTS_REQUEST,
  device => device
);

export const fetchDeviceCoverageSuccess = createAction(
  FETCH_COVERAGE_RESULTS_SUCCESS,
  (device, coverage) => ({ device, coverage })
);

export const fetchDeviceCoverageFailure = createAction(
  FETCH_COVERAGE_RESULTS_FAILURE,
  (device, error) => ({ device, error })
);

export const resetDeviceCoverageState = createAction(
  RESET_COVERAGE_DATA_STATE
);

// Selectors
export const getDeviceCoverageLoading = state => state.device.coverage.load;
export const getDeviceCoverage = state => state.device.coverage.coverage;
export const getDeviceCoverageError = state => state.device.coverage.error;

// Reducer
export const reducer = handleActions(
  {
    [fetchDeviceCoverageRequest]: (state, { payload: device }) => ({
      ...state,
      load: true,
      device,
    }),
    [fetchDeviceCoverageSuccess]: (state, { payload: { device, coverage } }) => ({
      ...state,
      load: false,
      device,
      coverage,
    }),
    [fetchDeviceCoverageFailure]: (state, { payload: { device, error } }) => ({
      ...state,
      load: false,
      device,
      error
    }),
    [resetDeviceCoverageState]: () => initialState
  },
  initialState
);

// Async action creators
export const fetchDeviceCoverage = device => (dispatch, getState, { fire }) => {
  dispatch(fetchDeviceCoverageRequest(device));

  fire.iotjsCoverageResults(device).then(snapshot => {
    let coverage = [];
    snapshot.forEach(child => {
      coverage = [...coverage, child.val()];
    });

    dispatch(fetchDeviceCoverageSuccess(device, coverage));
  }, error => {
    dispatch(fetchDeviceCoverageFailure(device, error));
  });
};
