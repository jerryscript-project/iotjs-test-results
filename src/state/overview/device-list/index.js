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

// Initial state.
export const initialState = {
  loading: false,
  error: null,
  results: [],
};

// Action types.
export const FETCH_OVERVIEW_RESULTS_REQUEST = 'FETCH_OVERVIEW_RESULTS_REQUEST';
export const FETCH_OVERVIEW_RESULTS_SUCCESS = 'FETCH_OVERVIEW_RESULTS_SUCCESS';
export const FETCH_OVERVIEW_RESULTS_FAILURE = 'FETCH_OVERVIEW_RESULTS_FAILURE';
export const REMOVE_OVERVIEW_RESULTS = 'REMOVE_OVERVIEW_RESULTS';
export const SET_OVERVIEW_LOADING = 'SET_OVERVIEW_LOADING';

// Actions creators.
export const fetchOverviewResultsRequest = createAction(
  FETCH_OVERVIEW_RESULTS_REQUEST
);

export const fetchOverviewResultsSuccess = createAction(
  FETCH_OVERVIEW_RESULTS_SUCCESS,
  (project, device, result) => ({ project, device, result })
);

export const fetchOverviewResultsFailure = createAction(
  FETCH_OVERVIEW_RESULTS_FAILURE,
  error => error
);

export const removeOverviewResults = createAction(
  REMOVE_OVERVIEW_RESULTS
);

export const setOverviewLoading = createAction(
  SET_OVERVIEW_LOADING,
  loading => loading
);

// Selectors.
export const getOverviewLoading = state => state.overview.deviceList.loading;
export const getOverviewError = state => state.overview.deviceList.error;
export const getOverviewResults = state => state.overview.deviceList.results;

// Reducer.
export const reducer = handleActions(
  {
    [fetchOverviewResultsRequest]: state => ({ ...state, loading: true }),
    [fetchOverviewResultsSuccess]: (state, { payload: { project, device, result } }) => ({
      ...state,
      results: [...state.results, { project, device, result }]
    }),
    [fetchOverviewResultsFailure]: (state, { payload: error }) => ({ ...state, loading: false, error }),
    [removeOverviewResults]: state => ({ ...state, results: [] }),
    [setOverviewLoading]: (state, { payload: loading }) => ({ ...state, loading })
  },
  initialState
);

// Async action creators.
export const fetchOverviewResults = (project, devices) => (dispatch, getState, { fire }) => {
  dispatch(removeOverviewResults());
  dispatch(fetchOverviewResultsRequest());

  return devices.forEach((device, index) => {
    fire.deviceLastResultDatabase(project, device.key).then(snapshot => {
      const value = snapshot.val();
      const data = value ? value[Object.keys(value)[0]] : null;

      dispatch(fetchOverviewResultsSuccess(project, device.key, data));

      if ((index + 1) / devices.length === 1) dispatch(setOverviewLoading(false));
    }, error => {
      dispatch(fetchOverviewResultsFailure(error));
    });
  });
};
