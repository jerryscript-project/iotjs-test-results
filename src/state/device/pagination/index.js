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
import { pagination } from '../../../constants';

// Initial state
export const initialState = {
  selected: 0,
  start: 0,
  end: 19,
};

// Action types
export const INCREASE_DEVICE_PAGINATION = 'INCREASE_DEVICE_PAGINATION';
export const DECREASE_DEVICE_PAGINATION = 'DECREASE_DEVICE_PAGINATION';
export const SET_DEVICE_PAGINATION = 'SET_DEVICE_PAGINATION';
export const RESET_DEVICE_PAGINATION = 'RESET_DEVICE_PAGINATION';

// Action creators
export const increaseDevicePagination = createAction(INCREASE_DEVICE_PAGINATION);

export const decreaseDevicePagination = createAction(DECREASE_DEVICE_PAGINATION);

export const setDevicePagination = createAction(
  SET_DEVICE_PAGINATION,
  (selected, start, end) => ({ selected, start, end })
);

export const resetDevicePagination = createAction(RESET_DEVICE_PAGINATION);

// Selectors
export const getDevicePaginationSelected = state => state.device.pagination.selected;
export const getDevicePaginationStart = state => state.device.pagination.start;
export const getDevicePaginationEnd = state => state.device.pagination.end;

// Reducer
export const reducer = handleActions(
  {
    [increaseDevicePagination]: state => ({
      ...state,
      selected: state.selected + 1,
      start: state.start + pagination.numberOfTestPerPage,
      end: state.end + pagination.numberOfTestPerPage,
    }),
    [decreaseDevicePagination]: state => ({
      ...state,
      selected: state.selected === 0 ? 0 : state.selected - 1,
      start: state.start === 0 ? state.start : state.start - pagination.numberOfTestPerPage,
      end: state.end === pagination.numberOfTestPerPage - 1
        ? state.end
        : state.end - pagination.numberOfTestPerPage
    }),
    [setDevicePagination]: (state, { payload: { selected, start, end } }) => ({ ...state, selected, start, end }),
    [resetDevicePagination]: () => initialState
  },
  initialState
);
