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
import { pagination } from '../../../constants';

// Action types
export const INCREASE_DEVICE_PAGINATION = 'INCREASE_DEVICE_PAGINATION';
export const DECREASE_DEVICE_PAGINATION = 'DECREASE_DEVICE_PAGINATION';
export const SET_DEVICE_PAGINATION = 'SET_DEVICE_PAGINATION';
export const RESET_DEVICE_PAGINATION = 'RESET_DEVICE_PAGINATION';

// Action creators
export const increaseDevicePagination = () => ({
  type: INCREASE_DEVICE_PAGINATION,
});

export const decreaseDevicePagination = () => ({
  type: DECREASE_DEVICE_PAGINATION,
});

export const setDevicePagination = (selected, start, end) => ({
  type: SET_DEVICE_PAGINATION,
  selected,
  start,
  end,
});

export const resetDevicePagination = () => ({
  type: RESET_DEVICE_PAGINATION,
});

// Selectors
export const getDevicePaginationSelected = state => state.device.pagination.selected;
export const getDevicePaginationStart = state => state.device.pagination.start;
export const getDevicePaginationEnd = state => state.device.pagination.end;

// Reducers
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INCREASE_DEVICE_PAGINATION:
      return {
        ...state,
        selected: state.selected + 1,
        start: state.start + pagination.numberOfTestPerPage,
        end: state.end + pagination.numberOfTestPerPage,
      };
    case DECREASE_DEVICE_PAGINATION:
      return {
        ...state,
        selected: state.selected === 0 ? 0 : state.selected - 1,
        start: state.start === 0 ? state.start : state.start - pagination.numberOfTestPerPage,
        end: state.end === pagination.numberOfTestPerPage - 1
          ? state.end
          : state.end - pagination.numberOfTestPerPage,
      };
    case SET_DEVICE_PAGINATION:
      return {
        ...state,
        selected: action.selected,
        start: action.start,
        end: action.end,
      };
    case RESET_DEVICE_PAGINATION:
      return initialState;
    default:
      return state;
  }
};
