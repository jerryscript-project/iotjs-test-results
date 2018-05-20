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

import initialState from './initial.state';

// Actions types
export const SET_DEVICE_DATEPICKER_DATES = 'SET_DEVICE_DATEPICKER_DATES';
export const SET_DEVICE_DATEPICKER_FOCUSED_INPUT = 'SET_DEVICE_DATEPICKER_FOCUSED_INPUT';

// Action creators
export const setDeviceDatepickerDates = (startDate, endDate) => ({
  type: SET_DEVICE_DATEPICKER_DATES,
  startDate,
  endDate,
});

export const setDeviceDatepickerFocusedInput = focusedInput => ({
  type: SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
  focusedInput,
});

// Selectors
export const getDeviceDatepickerStartDate = state => state.device.datepicker.startDate;
export const getDeviceDatepickerEndDate = state => state.device.datepicker.endDate;
export const getDeviceDatepickerFocusedInput = state => state.device.datepicker.focusedInput;

// Reducers
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_DEVICE_DATEPICKER_DATES:
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate,
      };
    case SET_DEVICE_DATEPICKER_FOCUSED_INPUT:
      return {
        ...state,
        focusedInput: action.focusedInput,
      };
    default:
      return state;
  }
};
