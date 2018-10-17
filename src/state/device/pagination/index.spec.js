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

import * as pagination from './';
import initialState from './initial.state';
import { pagination as constants } from '../../../constants';

describe('pagination action creators', () => {
  test('increaseDevicePagination', () => {
    const expectedAction = {
      type: pagination.INCREASE_DEVICE_PAGINATION,
    };
    expect(pagination.increaseDevicePagination()).toEqual(expectedAction);
  });

  test('decreaseDevicePagination', () => {
    const expectedAction = {
      type: pagination.DECREASE_DEVICE_PAGINATION,
    };
    expect(pagination.decreaseDevicePagination()).toEqual(expectedAction);
  });

  test('setDevicePagination', () => {
    const selected = 3;
    const start = 30;
    const end = 49;
    const expectedAction = {
      type: pagination.SET_DEVICE_PAGINATION,
      selected,
      start,
      end,
    };
    expect(pagination.setDevicePagination(selected, start, end)).toEqual(expectedAction);
  });

  test('resetDevicePagination', () => {
    const expectedAction = {
      type: pagination.RESET_DEVICE_PAGINATION,
    };
    expect(pagination.resetDevicePagination()).toEqual(expectedAction);
  });
});

describe('pagination selectors', () => {
  const selected = 5;
  const start = 50;
  const end = 69;
  const randomState = {
    device: {
      pagination: {
        selected,
        start,
        end,
      },
    },
  };
  const initState = {
    device: {
      pagination: {...initialState},
    },
  };

  test('should return the selected value (initialState)', () => {
    expect(pagination.getDevicePaginationSelected(initState)).toEqual(initialState.selected);
  });

  test('should return the selected value (randomState)', () => {
    expect(pagination.getDevicePaginationSelected(randomState)).toEqual(selected);
  });

  test('should return the start value (initialState)', () => {
    expect(pagination.getDevicePaginationStart(initState)).toEqual(initialState.start);
  });

  test('should return the start value (randomState)', () => {
    expect(pagination.getDevicePaginationStart(randomState)).toEqual(start);
  });

  test('should return the end value (initialState)', () => {
    expect(pagination.getDevicePaginationEnd(initState)).toEqual(initialState.end);
  });

  test('should return the end value (randomState)', () => {
    expect(pagination.getDevicePaginationEnd(randomState)).toEqual(end);
  });
});

describe('pagination reducers', () => {
  const state = {
    selected: 10,
    start: initialState.start + (10 * constants.numberOfTestPerPage),
    end: initialState.end + (10 * constants.numberOfTestPerPage),
  };

  test('should return the initialState (undefined)', () => {
    expect(pagination.default(undefined, {})).toEqual(initialState);
  });

  test('should handle the INCREASE_DEVICE_PAGINATION action (initialState)', () => {
    const action = {
      type: pagination.INCREASE_DEVICE_PAGINATION,
    };
    const expectedState = {
      selected: 1,
      start: initialState.start + constants.numberOfTestPerPage,
      end: initialState.end + constants.numberOfTestPerPage,
    };
    expect(pagination.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the INCREASE_DEVICE_PAGINATION action (state)', () => {
    const action = {
      type: pagination.INCREASE_DEVICE_PAGINATION,
    };
    const expectedState = {
      selected: 11,
      start: state.start + constants.numberOfTestPerPage,
      end: state.end + constants.numberOfTestPerPage,
    };
    expect(pagination.default(state, action)).toEqual(expectedState);
  });

  test('should handle the DECREASE_DEVICE_PAGINATION action (initialState)', () => {
    const action = {
      type: pagination.DECREASE_DEVICE_PAGINATION,
    };
    expect(pagination.default(initialState, action)).toEqual(initialState);
  });

  test('should handle the DECREASE_DEVICE_PAGINATION action (state)', () => {
    const action = {
      type: pagination.DECREASE_DEVICE_PAGINATION,
    };
    const expectedState = {
      selected: 9,
      start: state.start - constants.numberOfTestPerPage,
      end: state.end - constants.numberOfTestPerPage,
    };
    expect(pagination.default(state, action)).toEqual(expectedState);
  });

  test('should handle the SET_DEVICE_PAGINATION action (initialState)', () => {
    const selected = 4;
    const start = initialState.start + (4 * constants.numberOfTestPerPage);
    const end = initialState.end + (4 * constants.numberOfTestPerPage);
    const action = {
      type: pagination.SET_DEVICE_PAGINATION,
      selected,
      start,
      end,
    };
    const expectedState = {
      selected,
      start,
      end,
    };
    expect(pagination.default(initialState, action)).toEqual(expectedState);
  });

  test('should handle the SET_DEVICE_PAGINATION action (state)', () => {
    const selected = 12;
    const start = initialState.start + (12 * constants.numberOfTestPerPage);
    const end = initialState.end + (12 * constants.numberOfTestPerPage);
    const action = {
      type: pagination.SET_DEVICE_PAGINATION,
      selected,
      start,
      end,
    };
    const expectedState = {
      selected,
      start,
      end,
    };
    expect(pagination.default(state, action)).toEqual(expectedState);
  });

  test('should handle the RESET_DEVICE_PAGINATION action (initialState)', () => {
    const action = {
      type: pagination.RESET_DEVICE_PAGINATION,
    };
    expect(pagination.default(initialState, action)).toEqual(initialState);
  });

  test('should handle the RESET_DEVICE_PAGINATION action (state)', () => {
    const action = {
      type: pagination.RESET_DEVICE_PAGINATION,
    };
    expect(pagination.default(state, action)).toEqual(initialState);
  });
});
