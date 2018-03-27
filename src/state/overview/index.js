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
export const REQUEST_PROJECT_RESULTS = 'REQUEST_PROJECT_RESULTS';
export const RECEIVE_DEVICE_RESULT = 'RECEIVE_DEVICE_RESULT';
export const SET_LOADING = 'SET_LOADING';

// Actions.
export const requestProjectResults = project => ({
  type: REQUEST_PROJECT_RESULTS,
  project,
});

export const receiveDeviceResult = (project, device, result) => ({
  type: RECEIVE_DEVICE_RESULT,
  project,
  device,
  result,
});

export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
});

export const fetchProjectResults = (project, devices) => {
  return dispatch => {
    dispatch(requestProjectResults(project));

    return devices.forEach((device, index) => {
      deviceLastResultDatabase(project, device.key).then(snapshot => {
        dispatch(receiveDeviceResult(project, device.key, snapshot.val()));

        if ((index + 1) / devices.length === 1) dispatch(setLoading(false));
      });
    });
  };
};

// Selectors.
export const getLoading = state => state.overview.loading;
export const getLoadingProject = state => state.overview.loadingProject;
export const getResults = state => state.overview.results;

// Helpers.
export const cleanPathname = pathname => {
  return pathname.replace(/\//g, '');
};

// Reducers.
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_PROJECT_RESULTS:
      return Object.assign({}, state, {
        loading: true,
        loadingProject: action.project,
      });
    case RECEIVE_DEVICE_RESULT:
      return Object.assign({}, state, {
        results: [
          ...state.results,
          {
            project: action.project,
            device: action.device,
            result: action.result,
          },
        ],
      });
    case SET_LOADING:
      return Object.assign({}, state, {
        loading: action.loading,
      });
    default:
      return state;
  }
};
