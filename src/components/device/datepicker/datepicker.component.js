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

import React from 'react';
import PropTypes from 'prop-types';
import MomentPropTypes from 'react-moment-proptypes';
import { START_DATE, END_DATE } from 'react-dates/constants';
import { DateRangePicker } from 'react-dates';

import 'react-dates/initialize';

export default class Datepicker extends React.Component {

  constructor(props) {
    super(props);

    this.onDatesChange = ({start, end}) => {
      const { startDate, endDate } = this.props;

      this.props.onDatesChange(
        start || startDate,
        end || endDate,
      );
    };

    this.rangeCheck = day => !day.isBetween(this.props.minDate, this.props.maxDate, 'day', '[]');
  }

  render() {
    const { startDate, endDate, focusedInput, onFocusChange } = this.props;

    return (
      <div className="row my-2">
        <div className="col">
          <DateRangePicker
            startDate={startDate}
            startDateId="charts-start-date"
            endDate={endDate}
            endDateId="charts-end-date"
            focusedInput={focusedInput}
            onFocusChange={onFocusChange}
            onDatesChange={dates => this.onDatesChange(dates)}
            block={true}
            appendToBody={false}
            isOutsideRange={this.rangeCheck}
            minimumNights={0}
            numberOfMonths={2}
            hideKeyboardShortcutsPanel={true}
            withPortal={true}
            displayFormat="YYYY-MM-DD" />
        </div>
      </div>
    );
  }
}

Datepicker.propTypes = {
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  startDate: MomentPropTypes.momentObj,
  endDate: MomentPropTypes.momentObj,
  focusedInput: PropTypes.oneOf([START_DATE, END_DATE]),
  onDatesChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func.isRequired,
};
