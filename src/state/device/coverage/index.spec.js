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

import * as data from './';

describe('data action creators', () => {
  const propsNull = {
    device: undefined
  };
  const propsOne = {
    device: 'artik530'
  };
  const error = new Error('Could not find any coverage');

  test('fetchDeviceCoverageRequest (artik530)', () => {
    const expectedAction = {
      type: data.FETCH_COVERAGE_RESULTS_REQUEST,
      payload: {
        device: propsOne.device
      }
    };
    expect(data.fetchDeviceCoverageRequest(propsOne.device)).toEqual(expectedAction);
  });

  test('fetchDeviceCoverageRequest (null)', () => {
    const expectedAction = {
      type: data.FETCH_COVERAGE_RESULTS_REQUEST,
      payload: {
        device: propsNull.device
      }
    };
    expect(data.fetchDeviceCoverageRequest(propsNull.device)).toEqual(expectedAction);
  });

  test('fetchDeviceCoverageSuccess', () => {
    const expectedAction = {
      type: data.FETCH_COVERAGE_RESULTS_SUCCESS,
      payload: {
        device: propsOne.device
      }
    };
    expect(data.fetchDeviceCoverageSuccess(propsOne.device)).toEqual(expectedAction);
  });

  test('fetchDeviceCoverageSuccess (null)', () => {
    const expectedAction = {
      type: data.FETCH_COVERAGE_RESULTS_SUCCESS,
      payload: {
        device: propsNull.device
      }
    };
    expect(data.fetchDeviceCoverageSuccess(propsNull.device)).toEqual(expectedAction);
  });

  test('fetchDeviceCoverageFailure', () => {
    const expectedAction = {
      type: data.FETCH_COVERAGE_RESULTS_FAILURE,
      payload: {
        device: propsOne.device,
        error
      }
    };
    expect(data.fetchDeviceCoverageFailure(propsOne.device, error)).toEqual(expectedAction);
  });

  test('fetchDeviceCoverageFailure (null)', () => {
    const expectedAction = {
      type: data.FETCH_COVERAGE_RESULTS_FAILURE,
      payload: {
        device: propsNull.device,
        error
      }
    };
    expect(data.fetchDeviceCoverageFailure(propsNull.device, error)).toEqual(expectedAction);
  });

  test('resetDeviceCoverageState', () => {
    const expectedAction = {
      type: data.RESET_COVERAGE_DATA_STATE
    };
    expect(data.resetDeviceCoverageState()).toEqual(expectedAction);
  });
});

describe('data selectors', () => {
  const loading = true;
  const coverage = [{ file: 'kitten.test.js'}, { file: 'catchme.test.js'}];
  const error = new Error('Not this time');
  const randomState = {
    device: {
      data: {
        loading,
        coverage,
        error
      }
    }
  };
  const initState = {
    device: {
      data: { ...data.initialState }
    }
  };

  test('should return the loading value (initialState)', () => {
    expect(data.getDeviceCoverageLoading(initState)).toEqual(data.initialState.loading);
  });

  test('should return the loading value (randomState)', () => {
    expect(data.getDeviceCoverageLoading(randomState)).toEqual(loading);
  });

  test('should return the coverage value (initialState)', () => {
    expect(data.getDeviceCoverage(initState)).toEqual(data.initialState.coverage);
  });

  test('should return the coverage value (randomState)', () => {
    expect(data.getDeviceCoverage(randomState)).toEqual(coverage);
  });

  test('should return the error value (initialState)', () => {
    expect(data.getDeviceCoverageError(initState)).toEqual(data.initialState.error);
  });

  test('should return the error value (randomState)', () => {
    expect(data.getDeviceCoverageError(randomState)).toEqual(error);
  });
});


describe('data reducers', () => {
  const state = {
    device: 'rpi2',
    loading: false,
    measurements: [{ test: 'unicorn.test.js'}],
    error: new Error('Unicorns only exist in fairy tales.')
  };

  test('should return the initialState (undefined)', () => {
    expect(data.reducer(undefined, {})).toEqual(data.initialState);
  });

  test('should handle the FETCH_COVERAGE_RESULTS_REQUEST action (initialState)', () => {
    const action = {
      type: data.FETCH_COVERAGE_RESULTS_REQUEST,
      payload: {
        device: state.device
      }
    };
    const expectedState = {
      ...data.initialState,
      loading: true,
      device: state.device
    };
    expect(data.reducer(data.initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_COVERAGE_RESULTS_REQUEST action (state)', () => {
    const device = 'artik530';
    const action = {
      type: data.FETCH_COVERAGE_RESULTS_REQUEST,
      payload: { device }
    };
    const expectedState = {
      ...state,
      loading: true,
      device,
    };
    expect(data.reducer(state, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_COVERAGE_RESULTS_SUCCESS action (initialState)', () => {
    const action = {
      type: data.FETCH_COVERAGE_RESULTS_SUCCESS,
      payload: {
        device: state.device,
        coverage: state.coverage
      }
    };
    const expectedState = {
      ...data.initialState,
      loading: false,
      device: state.device,
      coverage: state.coverage,
    };
    expect(data.reducer(data.initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_COVERAGE_RESULTS_SUCCESS action (state)', () => {
    const device = 'artik053';
    const coverage = [{ test: 'kitten.test.js'}, { test: 'catchme.test.js'}];
    const action = {
      type: data.FETCH_COVERAGE_RESULTS_SUCCESS,
      payload: { device, coverage }
    };
    const expectedState = {
      ...state,
      loading: false,
      device,
      coverage
    };
    expect(data.reducer(state, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_COVERAGE_RESULTS_FAILURE action (initialState)', () => {
    const action = {
      type: data.FETCH_COVERAGE_RESULTS_FAILURE,
      payload: {
        device: state.device,
        error: state.error
      }
    };
    const expectedState = {
      ...data.initialState,
      loading: false,
      device: state.device,
      error: state.error
    };
    expect(data.reducer(data.initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_COVERAGE_RESULTS_FAILURE action (state)', () => {
    const device = 'artik530';
    const error = new Error('Another one bites the dust');
    const action = {
      type: data.FETCH_COVERAGE_RESULTS_FAILURE,
      payload: { device, error }
    };
    const expectedState = {
      ...state,
      loading: false,
      device,
      error
    };
    expect(data.reducer(state, action)).toEqual(expectedState);
  });

  test('should handle the RESET_COVERAGE_DATA_STATE action (initialState)', () => {
    const action = {
      type: data.RESET_COVERAGE_DATA_STATE
    };
    expect(data.reducer(data.initialState, action)).toEqual(data.initialState);
  });

  test('should handle the RESET_COVERAGE_DATA_STATE action (state)', () => {
    const action = {
      type: data.RESET_COVERAGE_DATA_STATE
    };
    expect(data.reducer(state, action)).toEqual(data.initialState);
  });
});
