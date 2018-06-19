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
import * as datepicker from '../../../state/device/datepicker';
import initialState from '../../../state/device/datepicker/initial.state';

describe('datepickerdatepicker action creators', () => {
  it('setDeviceDatepickerDates', () => {
    const startDate = moment.utc().clone().subtract(10, 'day');
    const endDate = moment.utc();
    const expectedAction = {
      type: datepicker.SET_DEVICE_DATEPICKER_DATES,
      startDate,
      endDate,
    };
    expect(datepicker.setDeviceDatepickerDates(startDate, endDate)).toEqual(expectedAction);
  });

  it('setDeviceDatepickerFocusedInput (start date)', () => {
    const focusedInput = START_DATE;
    const expectedAction = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      focusedInput,
    };
    expect(datepicker.setDeviceDatepickerFocusedInput(focusedInput)).toEqual(expectedAction);
  });

  it('setDeviceDatepickerFocusedInput (end date)', () => {
    const focusedInput = END_DATE;
    const expectedAction = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      focusedInput,
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
        endDate,
      },
    },
  };
  const initState = {
    device: {
      datepicker: {...initialState},
    },
  };

  it('should return the focusedInput value (initialState)', () => {
    expect(datepicker.getDeviceDatepickerFocusedInput(initState)).toEqual(initialState.focusedInput);
  });

  it('should return the focusedInput value (randomState)', () => {
    expect(datepicker.getDeviceDatepickerFocusedInput(randomState)).toEqual(focusedInput);
  });

  it('should return the startDate value (initialState)', () => {
    expect(datepicker.getDeviceDatepickerStartDate(initState)).toEqual(initialState.startDate);
  });

  it('should return the startDate value (randomState)', () => {
    expect(datepicker.getDeviceDatepickerStartDate(randomState)).toEqual(startDate);
  });

  it('should return the endDate value (initialState)', () => {
    expect(datepicker.getDeviceDatepickerEndDate(initState)).toEqual(initialState.endDate);
  });

  it('should return the endDate value (randomState)', () => {
    expect(datepicker.getDeviceDatepickerEndDate(randomState)).toEqual(endDate);
  });
});

describe('datepicker reducers', () => {
  const state = {
    focusedInput: END_DATE,
    startDate: moment.utc().clone().subtract(11, 'day'),
    endDate: moment.utc().clone().subtract(3, 'day'),
  };

  it('should return the initialState (undefined)', () => {
    expect(datepicker.default(undefined, {})).toEqual(initialState);
  });

  it('should handle the SET_DEVICE_DATEPICKER_DATES action (initialState)', () => {
    const startDate = moment.utc().clone().subtract(40, 'day');
    const endDate = moment.utc();
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_DATES,
      startDate,
      endDate,
    };
    const expectedState = {
      ...initialState,
      startDate,
      endDate,
    };
    expect(datepicker.default(initialState, action)).toEqual(expectedState);
  });

  it('should handle the SET_DEVICE_DATEPICKER_DATES action (state)', () => {
    const startDate = moment.utc().clone().subtract(22, 'day');
    const endDate = moment.utc();
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_DATES,
      startDate,
      endDate,
    };
    const expectedState = {
      ...state,
      startDate,
      endDate,
    };
    expect(datepicker.default(state, action)).toEqual(expectedState);
  });

  it('should handle the SET_DEVICE_DATEPICKER_FOCUSED_INPUT action (initialState, START_DATE)', () => {
    const focusedInput = START_DATE;
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      focusedInput,
    };
    const expectedState = {
      ...initialState,
      focusedInput,
    };
    expect(datepicker.default(initialState, action)).toEqual(expectedState);
  });

  it('should handle the SET_DEVICE_DATEPICKER_FOCUSED_INPUT action (initialState, END_DATE)', () => {
    const focusedInput = END_DATE;
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      focusedInput,
    };
    const expectedState = {
      ...initialState,
      focusedInput,
    };
    expect(datepicker.default(initialState, action)).toEqual(expectedState);
  });

  it('should handle the SET_DEVICE_DATEPICKER_FOCUSED_INPUT action (state, START_DATE)', () => {
    const focusedInput = START_DATE;
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      focusedInput,
    };
    const expectedState = {
      ...state,
      focusedInput,
    };
    expect(datepicker.default(state, action)).toEqual(expectedState);
  });

  it('should handle the SET_DEVICE_DATEPICKER_FOCUSED_INPUT action (state, END_DATE)', () => {
    const focusedInput = END_DATE;
    const action = {
      type: datepicker.SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
      focusedInput,
    };
    const expectedState = {
      ...state,
      focusedInput,
    };
    expect(datepicker.default(state, action)).toEqual(expectedState);
  });
});
