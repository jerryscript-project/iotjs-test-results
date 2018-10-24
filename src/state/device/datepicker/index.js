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

// Initial state
export const initialState = {
  focusedInput: null,
  startDate: null,
  endDate: null,
};

// Actions types
export const SET_DEVICE_DATEPICKER_DATES = 'SET_DEVICE_DATEPICKER_DATES';
export const SET_DEVICE_DATEPICKER_FOCUSED_INPUT = 'SET_DEVICE_DATEPICKER_FOCUSED_INPUT';

// Action creators
export const setDeviceDatepickerDates = createAction(
  SET_DEVICE_DATEPICKER_DATES,
  (startDate, endDate) => ({ startDate, endDate })
);

export const setDeviceDatepickerFocusedInput = createAction(
  SET_DEVICE_DATEPICKER_FOCUSED_INPUT,
  focusedInput => focusedInput
);

// Selectors
export const getDeviceDatepickerStartDate = state => state.device.datepicker.startDate;
export const getDeviceDatepickerEndDate = state => state.device.datepicker.endDate;
export const getDeviceDatepickerFocusedInput = state => state.device.datepicker.focusedInput;

// Reducer
export const reducer = handleActions(
  {
    [setDeviceDatepickerDates]: (state, { payload: { startDate, endDate } }) => ({ ...state, startDate, endDate }),
    [setDeviceDatepickerFocusedInput]: (state, { payload: focusedInput }) => ({ ...state, focusedInput })
  },
  initialState
);
