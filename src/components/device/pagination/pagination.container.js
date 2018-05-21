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

import { connect } from 'react-redux';
import Pagination from './pagination.component';
import {
  getDevicePaginationSelected,
  decreaseDevicePagination,
  increaseDevicePagination,
  setDevicePagination,
} from '../../../state/device/pagination';

const mapStateToProps = state => ({
  selected: getDevicePaginationSelected(state),
});

const mapDispatchToProps = dispatch => ({
  handlePreviousClick: () => dispatch(decreaseDevicePagination()),
  handleNextClick: () => dispatch(increaseDevicePagination()),
  handleSelectClick: (selected, start, end) => dispatch(setDevicePagination(selected, start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
