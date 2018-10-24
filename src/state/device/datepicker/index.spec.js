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

import moment from 'moment';
import { START_DATE, END_DATE } from 'react-dates/constants';
import * as datepicker from './';

describe('datepickerdatepicker action creators', () => {
  test('setDeviceDatepickerDates', () => {
    const startDate = moment.utc().clone().subtract(10, 'day');
    const endDate = moment.utc();
    const expectedAction = {
      type: datepicker.SET_DEVICE_DATEPICKER_DATES,
      payload: { startDate, endDate }
    };
    expect(datepicker.setDeviceDatepickerDates(startDate, endDate)).toEqual(expectedAction);
  });

  test('setDeviceDatepickerFocusedInput (start date)', () => {
    const focusedInput = START_DATE;
    const expectedAction = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      payload: focusedInput
    };
    expect(datepicker.setDeviceDatepickerFocusedInput(focusedInput)).toEqual(expectedAction);
  });

  test('setDeviceDatepickerFocusedInput (end date)', () => {
    const focusedInput = END_DATE;
    const expectedAction = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      payload: focusedInput
    };
    expect(datepicker.setDeviceDatepickerFocusedInput(focusedInput)).toEqual(expectedAction);
  });
});

describe('datepicker selectors', () => {
  const focusedInput = START_DATE;
  const startDate = moment.utc().clone().subtract(21, 'day');
  const endDate = moment.utc();
  const randomState = {
    device: {
      datepicker: {
        focusedInput,
        startDate,
        endDate
      }
    }
  };
  const initState = {
    device: {
      datepicker: { ...datepicker.initialState },
    },
  };

  test('should return the focusedInput value (initialState)', () => {
    expect(datepicker.getDeviceDatepickerFocusedInput(initState)).toEqual(datepicker.initialState.focusedInput);
  });

  test('should return the focusedInput value (randomState)', () => {
    expect(datepicker.getDeviceDatepickerFocusedInput(randomState)).toEqual(focusedInput);
  });

  test('should return the startDate value (initialState)', () => {
    expect(datepicker.getDeviceDatepickerStartDate(initState)).toEqual(datepicker.initialState.startDate);
  });

  test('should return the startDate value (randomState)', () => {
    expect(datepicker.getDeviceDatepickerStartDate(randomState)).toEqual(startDate);
  });

  test('should return the endDate value (initialState)', () => {
    expect(datepicker.getDeviceDatepickerEndDate(initState)).toEqual(datepicker.initialState.endDate);
  });

  test('should return the endDate value (randomState)', () => {
    expect(datepicker.getDeviceDatepickerEndDate(randomState)).toEqual(endDate);
  });
});

describe('datepicker reducers', () => {
  const state = {
    focusedInput: START_DATE,
    startDate: moment.utc().clone().subtract(11, 'day'),
    endDate: moment.utc().clone().subtract(3, 'day')
  };

  test('should return the initialState (undefined)', () => {
    expect(datepicker.reducer(undefined, {})).toEqual(datepicker.initialState);
  });

  test('should handle the SET_DEVICE_DATEPICKER_DATES action (initialState)', () => {
    const startDate = moment.utc().clone().subtract(40, 'day');
    const endDate = moment.utc();
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_DATES,
      payload: { startDate, endDate }
    };
    const expectedState = { ...state, startDate, endDate };
    expect(datepicker.reducer(state, action)).toEqual(expectedState);
  });

  test('should handle the SET_DEVICE_DATEPICKER_DATES action (state)', () => {
    const startDate = moment.utc().clone().subtract(22, 'day');
    const endDate = moment.utc();
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_DATES,
      payload: { startDate, endDate }
    };
    const expectedState = { ...state, startDate, endDate };
    expect(datepicker.reducer(state, action)).toEqual(expectedState);
  });

  test('should handle the SET_DEVICE_DATEPICKER_FOCUSED_INPUT action (initialState, START_DATE)', () => {
    const focusedInput = START_DATE;
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      payload: focusedInput
    };
    const expectedState = {
      ...datepicker.initialState,
      focusedInput
    };
    expect(datepicker.reducer(datepicker.initialState, action)).toEqual(expectedState);
  });

  test('should handle the SET_DEVICE_DATEPICKER_FOCUSED_INPUT action (initialState, END_DATE)', () => {
    const focusedInput = END_DATE;
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      payload: focusedInput
    };
    const expectedState = {
      ...datepicker.initialState,
      focusedInput
    };
    expect(datepicker.reducer(datepicker.initialState, action)).toEqual(expectedState);
  });

  test('should handle the SET_DEVICE_DATEPICKER_FOCUSED_INPUT action (state, START_DATE)', () => {
    const focusedInput = START_DATE;
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      payload: focusedInput
    };
    const expectedState = {
      ...state,
      focusedInput
    };
    expect(datepicker.reducer(state, action)).toEqual(expectedState);
  });

  test('should handle the SET_DEVICE_DATEPICKER_FOCUSED_INPUT action (state, END_DATE)', () => {
    const focusedInput = END_DATE;
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      payload: focusedInput
    };
    const expectedState = {
      ...state,
      focusedInput
    };
    expect(datepicker.reducer(state, action)).toEqual(expectedState);
  });
});
