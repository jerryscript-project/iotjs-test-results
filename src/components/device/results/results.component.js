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
import ValidResult from './valid-result/valid-result.component';
import InvalidResult from './invalid-result/invalid-result.component';

export default class Results extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { measurements, project, start, end } = this.props;
    const measurementList = measurements.slice().reverse();

    const resultList = measurementList
      .slice(start, end)
      .map((measurement, index) => {
        if (!measurement.measured)
          return <InvalidResult key={measurement.date.toISOString()} date={measurement.date}/>;

        let prevMeasurement = measurementList
          .slice(start + index + 1)
          .find(function(element) {
            return element.measured;
          });

        const validResult = <ValidResult key={measurement.date.toISOString()} data={measurement} project={project}/>;

        // No previous measurement available to calculate the memory changes.
        if (!prevMeasurement)
          return validResult;

        // Calculate the memory changes.
        prevMeasurement.tests.filter(test => 'memstat' in test).forEach(function(test) {
          const actualTest = measurement.tests
            .filter(test => 'memstat' in test)
            .find( element => element.name === test.name);

          // There are no two identified tests with memory measurements.
          if (!actualTest)
            return validResult;

          // Found two tests with the same name and both have memory measurements, calculate their diferrence.
          const { total, prev } = ['heap-jerry', 'heap-system', 'stack'].reduce((acc, area) => ({
            total: (acc.total + (parseInt(actualTest.memstat[area]) || 0)),
            prev: (acc.prev + (parseInt(test.memstat[area]) || 0)),
          }), { total: 0, prev: 0 });

          // If the memory is 0, there is nothing to compare.
          if (prev !== 0) {
            const diff = total - prev;
            // Upload the change field with the percentage difference.
            actualTest.memstat.change = (diff / (prev / 100)).toFixed(1);
          }
        });

        return validResult;
      });

    return (
      <div className="list-group">
        {resultList}
      </div>
    );
  }
}

Results.propTypes = {
  measurements: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};
