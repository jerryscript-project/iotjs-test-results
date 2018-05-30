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
import Datepicker from './datepicker/datepicker.container';
import Chartjs from './chartjs/chartjs.component';
import Info from './info/info.component';

export default class Chart extends React.Component {

  constructor(props) {
    super(props);

    this.getDates = () => {
      const { measurements } = this.props;

      const minDate = measurements[0].date;
      const maxDate = measurements[measurements.length - 1].date;

      return { minDate, maxDate };
    };
  }

  componentWillMount() {
    if (!this.props.startDate && !this.props.endDate) {
      const { minDate, maxDate } = this.getDates();

      const start = maxDate.clone().subtract(2, 'months');
      const startDate = start.isBefore(minDate) ? minDate.clone() : start;

      this.props.handleDatesChange(startDate, maxDate.clone());
    }
  }

  render() {
    const { measurements, project, startDate, endDate } = this.props;
    const { minDate, maxDate } = this.getDates();
    const data = measurements.filter(m => m.date.isBetween(startDate, endDate, 'day', '[]'));

    return (
      <div className="row my-2">
        <div className="col">
          <Datepicker
            minDate={minDate}
            maxDate={maxDate} />
          <Chartjs
            data={data}
            project={project} />
          <Info
            project={project} />
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  measurements: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  startDate: MomentPropTypes.momentObj,
  endDate: MomentPropTypes.momentObj,
  handleDatesChange: PropTypes.func.isRequired,
};
