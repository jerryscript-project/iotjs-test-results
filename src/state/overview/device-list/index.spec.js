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

import * as deviceList from './';
import initialState from './initial.state';

describe('device list action creators', () => {
  test('fetchOverviewResultsRequest', () => {
    const expectedAction = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_REQUEST,
    };
    expect(deviceList.fetchOverviewResultsRequest()).toEqual(expectedAction);
  });

  test('fetchOverviewResultsSuccess (iotjs, stm32)', () => {
    const project = 'iotjs';
    const device = 'stm32';
    const result = [{ test: 'issue.test.js', result: 'pass' }];
    const expectedAction = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_SUCCESS,
      project,
      device,
      result,
    };
    expect(deviceList.fetchOverviewResultsSuccess(project, device, result)).toEqual(expectedAction);
  });

  test('fetchOverviewResultsSuccess (jerryscript, stm32)', () => {
    const project = 'jerryscript';
    const device = 'stm32';
    const result = [{ test: 'run-pass.test.js', result: 'pass' }];
    const expectedAction = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_SUCCESS,
      project,
      device,
      result,
    };
    expect(deviceList.fetchOverviewResultsSuccess(project, device, result)).toEqual(expectedAction);
  });

  test('fetchOverviewResultsFailure', () => {
    const error = new Error('Something bad happened');
    const expectedAction = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_FAILURE,
      error,
    };
    expect(deviceList.fetchOverviewResultsFailure(error)).toEqual(expectedAction);
  });

  test('removeOverviewResults', () => {
    const expectedAction = {
      type: deviceList.REMOVE_OVERVIEW_RESULTS,
    };
    expect(deviceList.removeOverviewResults()).toEqual(expectedAction);
  });

  test('setOverviewLoading (true)', () => {
    const loading = true;
    const expectedAction = {
      type: deviceList.SET_OVERVIEW_LOADING,
      loading,
    };
    expect(deviceList.setOverviewLoading(loading)).toEqual(expectedAction);
  });

  test('setOverviewLoading (false)', () => {
    const loading = true;
    const expectedAction = {
      type: deviceList.SET_OVERVIEW_LOADING,
      loading,
    };
    expect(deviceList.setOverviewLoading(loading)).toEqual(expectedAction);
  });
});

describe('device list selectors', () => {
  const loading = false;
  const results = [{ test: 'laugh.test.js', result: 'fail'}, { test: 'joker.test.js', result: 'fail'}];
  const error = new Error('Not this time');
  const randomState = {
    overview: {
      deviceList: {
        loading,
        results,
        error,
      },
    },
  };
  const initState = {
    overview: {
      deviceList: {...initialState},
    },
  };

  test('should return the loading value (initialState)', () => {
    expect(deviceList.getOverviewLoading(initState)).toEqual(initialState.loading);
  });

  test('should return the loading value (randomState)', () => {
    expect(deviceList.getOverviewLoading(randomState)).toEqual(loading);
  });

  test('should return the results value (initialState)', () => {
    expect(deviceList.getOverviewResults(initState)).toEqual(initialState.results);
  });

  test('should return the results value (randomState)', () => {
    expect(deviceList.getOverviewResults(randomState)).toEqual(results);
  });

  test('should return the error value (initialState)', () => {
    expect(deviceList.getOverviewError(initState)).toEqual(initialState.error);
  });

  test('should return the error value (randomState)', () => {
    expect(deviceList.getOverviewError(randomState)).toEqual(error);
  });
});

describe('device list reducers', () => {
  const state = {
    loading: false,
    results: [{
      project: 'iotjs',
      device: 'artik530',
      result: [{ test: 'adc.test.js', result: 'pass' }, { test: 'ble.test.js', result: 'pass' }],
    }, {
      project: 'iotjs',
      device: 'rpi2',
      result: [{ test: 'adc.test.js', result: 'pass' }, { test: 'ble.test.js', result: 'fail' }],
    }, {
      project: 'jerryscript',
      device: 'artik530',
      result: [{ test: 'adc.test.js', result: 'skip' }, { test: 'ble.test.js', result: 'skip' }],
    }, {
      project: 'jerryscript',
      device: 'rpi2',
      result: [{ test: 'adc.test.js', result: 'fail' }, { test: 'ble.test.js', result: 'fail' }],
    }],
    error: new Error('The server is not available'),
  };

  test('should return the initialState (undefined)', () => {
    expect(deviceList.default(undefined, {})).toEqual(initialState);
  });

  test('should handle the FETCH_OVERVIEW_RESULTS_REQUEST action (initialState)', () => {
    const action = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_REQUEST,
      loading: state.loading,
    };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    expect(deviceList.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_OVERVIEW_RESULTS_REQUEST action (state)', () => {
    const loading = true;
    const action = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_REQUEST,
      loading,
    };
    const expectedState = {
      ...state,
      loading: true,
    };
    expect(deviceList.default(state, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_OVERVIEW_RESULTS_SUCCESS action (initialState)', () => {
    const result = { test: 'new.test.js', result: 'skip' };
    const action = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_SUCCESS,
      project: state.project,
      device: state.device,
      result,
    };
    const expectedState = {
      ...initialState,
      results: [
        ...initialState.results,
        {
          project: state.project,
          device: state.device,
          result,
        },
      ],
    };
    expect(deviceList.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_OVERVIEW_RESULTS_SUCCESS action (state)', () => {
    const project = 'jerryscript';
    const device = 'stm32';
    const result = { test: 'colibri.test.js', result: 'pass'};
    const action = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_SUCCESS,
      project,
      device,
      result,
    };
    const expectedState = {
      ...state,
      results: [
        ...state.results,
        {
          project,
          device,
          result,
        },
      ],
    };
    expect(deviceList.default(state, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_OVERVIEW_RESULTS_FAILURE action (initialState)', () => {
    const action = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_FAILURE,
      error: state.error,
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: state.error,
    };
    expect(deviceList.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_OVERVIEW_RESULTS_FAILURE action (state)', () => {
    const error = new Error('Broken');
    const action = {
      type: deviceList.FETCH_OVERVIEW_RESULTS_FAILURE,
      error,
    };
    const expectedState = {
      ...state,
      loading: false,
      error,
    };
    expect(deviceList.default(state, action)).toEqual(expectedState);
  });

  test('should handle the REMOVE_OVERVIEW_RESULTS action (initialState)', () => {
    const action = {
      type: deviceList.REMOVE_OVERVIEW_RESULTS,
    };
    const expectedState = {
      ...initialState,
      results: [],
    };
    expect(deviceList.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the REMOVE_OVERVIEW_RESULTS action (state)', () => {
    const action = {
      type: deviceList.REMOVE_OVERVIEW_RESULTS,
    };
    const expectedState = {
      ...state,
      results: [],
    };
    expect(deviceList.default(state, action)).toEqual(expectedState);
  });

  test('should handle the SET_OVERVIEW_LOADING action (initialState, true)', () => {
    const action = {
      type: deviceList.SET_OVERVIEW_LOADING,
      loading: true,
    };
    const expectedState = {
      ...initialState,
      loading: true,
    };
    expect(deviceList.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the SET_OVERVIEW_LOADING action (initialState, false)', () => {
    const action = {
      type: deviceList.SET_OVERVIEW_LOADING,
      loading: false,
    };
    const expectedState = {
      ...initialState,
      loading: false,
    };
    expect(deviceList.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the SET_OVERVIEW_LOADING action (state, true)', () => {
    const action = {
      type: deviceList.SET_OVERVIEW_LOADING,
      loading: true,
    };
    const expectedState = {
      ...state,
      loading: true,
    };
    expect(deviceList.default(state, action)).toEqual(expectedState);
  });

  test('should handle the SET_OVERVIEW_LOADING action (state, false)', () => {
    const action = {
      type: deviceList.SET_OVERVIEW_LOADING,
      loading: false,
    };
    const expectedState = {
      ...state,
      loading: false,
    };
    expect(deviceList.default(state, action)).toEqual(expectedState);
  });
});
