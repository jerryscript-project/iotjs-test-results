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
import initialState from './initial.state';

describe('data action creators', () => {
  const propsNull = {
    project: undefined,
    device: undefined,
  };
  const propsOne = {
    project: 'iotjs',
    device: 'artik530',
  };
  const propsTwo = {
    project: 'jerryscript',
    device: 'rpi2',
  };
  const error = new Error('Could not find any data');

  test('fetchDeviceDataMeasurementsRequest (iotjs)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST,
      project: propsOne.project,
      device: propsOne.device,
    };
    expect(data.fetchDeviceDataMeasurementsRequest(propsOne.project, propsOne.device)).toEqual(expectedAction);
  });

  test('fetchDeviceDataMeasurementsRequest (jerryscript)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST,
      project: propsTwo.project,
      device: propsOne.device,
    };
    expect(data.fetchDeviceDataMeasurementsRequest(propsTwo.project, propsOne.device)).toEqual(expectedAction);
  });

  test('fetchDeviceDataMeasurementsRequest (null)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST,
      project: propsNull.project,
      device: propsNull.device,
    };
    expect(data.fetchDeviceDataMeasurementsRequest(propsNull.project, propsNull.device)).toEqual(expectedAction);
  });

  test('fetchDeviceDataMeasurementsSuccess (iotjs)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS,
      project: propsOne.project,
      device: propsTwo.device,
    };
    expect(data.fetchDeviceDataMeasurementsSuccess(propsOne.project, propsTwo.device)).toEqual(expectedAction);
  });

  test('fetchDeviceDataMeasurementsSuccess (jerryscript)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS,
      project: propsTwo.project,
      device: propsTwo.device,
    };
    expect(data.fetchDeviceDataMeasurementsSuccess(propsTwo.project, propsTwo.device)).toEqual(expectedAction);
  });

  test('fetchDeviceDataMeasurementsSuccess (null)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS,
      project: propsNull.project,
      device: propsNull.device,
    };
    expect(data.fetchDeviceDataMeasurementsSuccess(propsNull.project, propsNull.device)).toEqual(expectedAction);
  });

  test('fetchDeviceDataMeasurementsFailure (iotjs)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE,
      project: propsOne.project,
      device: propsOne.device,
      error,
    };
    expect(data.fetchDeviceDataMeasurementsFailure(propsOne.project, propsOne.device, error)).toEqual(expectedAction);
  });

  test('fetchDeviceDataMeasurementsFailure (jerryscript)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE,
      project: propsTwo.project,
      device: propsOne.device,
      error,
    };
    expect(data.fetchDeviceDataMeasurementsFailure(propsTwo.project, propsOne.device, error)).toEqual(expectedAction);
  });

  test('fetchDeviceDataMeasurementsFailure (null)', () => {
    const expectedAction = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE,
      project: propsNull.project,
      device: propsNull.device,
      error,
    };
    expect(data.fetchDeviceDataMeasurementsFailure(propsNull.project, propsNull.device, error)).toEqual(expectedAction);
  });

  test('resetDeviceDataState', () => {
    const expectedAction = {
      type: data.RESET_DEVICE_DATA_STATE,
    };
    expect(data.resetDeviceDataState()).toEqual(expectedAction);
  });
});

describe('data selectors', () => {
  const loading = true;
  const measurements = [{ test: 'colibri.test.js', result: 'pass'}, { test: 'catchme.test.js', result: 'fail'}];
  const error = new Error('Not this time');
  const randomState = {
    device: {
      data: {
        loading,
        measurements,
        error,
      },
    },
  };
  const initState = {
    device: {
      data: {...initialState},
    },
  };

  test('should return the loading value (initialState)', () => {
    expect(data.getDeviceDataLoading(initState)).toEqual(initialState.loading);
  });

  test('should return the loading value (randomState)', () => {
    expect(data.getDeviceDataLoading(randomState)).toEqual(loading);
  });

  test('should return the measurements value (initialState)', () => {
    expect(data.getDeviceDataMeasurements(initState)).toEqual(initialState.measurements);
  });

  test('should return the measurements value (randomState)', () => {
    expect(data.getDeviceDataMeasurements(randomState)).toEqual(measurements);
  });

  test('should return the error value (initialState)', () => {
    expect(data.getDeviceDataError(initState)).toEqual(initialState.error);
  });

  test('should return the error value (randomState)', () => {
    expect(data.getDeviceDataError(randomState)).toEqual(error);
  });
});

describe('data reducers', () => {
  const state = {
    project: 'iotjs',
    device: 'rpi2',
    loading: false,
    measurements: [{ test: 'cookie.test.js', result: 'pass' }],
    error: new Error('The time has come for these cookies....'),
  };

  test('should return the initialState (undefined)', () => {
    expect(data.default(undefined, {})).toEqual(initialState);
  });

  test('should handle the FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST action (initialState)', () => {
    const action = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST,
      project: state.project,
      device: state.device,
    };
    const expectedState = {
      ...initialState,
      loading: true,
      project: state.project,
      device: state.device,
    };
    expect(data.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST action (state)', () => {
    const project = 'jerryscript';
    const device = 'artik530';
    const action = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_REQUEST,
      project,
      device,
    };
    const expectedState = {
      ...state,
      loading: true,
      project,
      device,
    };
    expect(data.default(state, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS action (initialState)', () => {
    const action = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS,
      project: state.project,
      device: state.device,
      measurements: state.measurements,
    };
    const expectedState = {
      ...initialState,
      loading: false,
      project: state.project,
      device: state.device,
      measurements: state.measurements,
    };
    expect(data.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS action (state)', () => {
    const project = 'jerryscript';
    const device = 'stm32';
    const measurements = [{ test: 'colibri.test.js', result: 'pass'}, { test: 'catchme.test.js', result: 'fail'}];
    const action = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_SUCCESS,
      project,
      device,
      measurements,
    };
    const expectedState = {
      ...state,
      loading: false,
      project,
      device,
      measurements,
    };
    expect(data.default(state, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE action (initialState)', () => {
    const action = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE,
      project: state.project,
      device: state.device,
      error: state.error,
    };
    const expectedState = {
      ...initialState,
      loading: false,
      project: state.project,
      device: state.device,
      error: state.error,
    };
    expect(data.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE action (state)', () => {
    const project = 'iotjs';
    const device = 'stm32';
    const error = new Error('Another bite to dust');
    const action = {
      type: data.FETCH_DEVICE_DATA_MEASUREMENTS_FAILURE,
      project,
      device,
      error,
    };
    const expectedState = {
      ...state,
      loading: false,
      project,
      device,
      error,
    };
    expect(data.default(state, action)).toEqual(expectedState);
  });

  test('should handle the RESET_DEVICE_DATA_STATE action (initialState)', () => {
    const action = {
      type: data.RESET_DEVICE_DATA_STATE,
    };
    expect(data.default(initialState, action)).toEqual(initialState);
  });

  test('should handle the RESET_DEVICE_DATA_STATE action (state)', () => {
    const action = {
      type: data.RESET_DEVICE_DATA_STATE,
    };
    expect(data.default(state, action)).toEqual(initialState);
  });
});
