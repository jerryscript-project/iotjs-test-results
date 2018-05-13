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

import { deviceLastResultDatabase } from '../../firebase';
import initialState from './initial.state';

// Action types.
export const FETCH_OVERVIEW_RESULTS_REQUEST = 'FETCH_OVERVIEW_RESULTS_REQUEST';
export const FETCH_OVERVIEW_RESULTS_SUCCESS = 'FETCH_OVERVIEW_RESULTS_SUCCESS';
export const FETCH_OVERVIEW_RESULTS_FAILURE = 'FETCH_OVERVIEW_RESULTS_FAILURE';
export const REMOVE_OVERVIEW_RESULTS = 'REMOVE_OVERVIEW_RESULTS';
export const SET_OVERVIEW_LOADING = 'SET_OVERVIEW_LOADING';

// Actions.
export const fetchOverviewResultsRequest = () => ({
  type: FETCH_OVERVIEW_RESULTS_REQUEST,
});

export const fetchOverviewResultsSuccess = (project, device, result) => ({
  type: FETCH_OVERVIEW_RESULTS_SUCCESS,
  project,
  device,
  result,
});

export const fetchOverviewResultsFailure = error => ({
  type: FETCH_OVERVIEW_RESULTS_FAILURE,
  error,
});

export const removeOverviewResults = () => ({
  type: REMOVE_OVERVIEW_RESULTS,
});

export const setOverviewLoading = loading => ({
  type: SET_OVERVIEW_LOADING,
  loading,
});

// Async action creators.
export const fetchOverviewResults = (project, devices) => dispatch => {
  dispatch(removeOverviewResults());
  dispatch(fetchOverviewResultsRequest());

  return devices.forEach((device, index) => {
    deviceLastResultDatabase(project, device.key).then(snapshot => {
      const value = snapshot.val();
      const data = value ? value[Object.keys(value)[0]] : null;

      dispatch(fetchOverviewResultsSuccess(project, device.key, data));

      if ((index + 1) / devices.length === 1) dispatch(setOverviewLoading(false));
    }, error => {
      dispatch(fetchOverviewResultsFailure(error));
    });
  });
};

// Selectors.
export const getOverviewLoading = state => state.overviewDeviceList.loading;
export const getOverviewError = state => state.overviewDeviceList.error;
export const getOverviewResults = state => state.overviewDeviceList.results;

// Reducers.
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_OVERVIEW_RESULTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OVERVIEW_RESULTS_SUCCESS:
      return {
        ...state,
        results: [
          ...state.results,
          {
            project: action.project,
            device: action.device,
            result: action.result,
          },
        ],
      };
    case FETCH_OVERVIEW_RESULTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REMOVE_OVERVIEW_RESULTS:
      return {
        ...state,
        results: [],
      };
    case SET_OVERVIEW_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
