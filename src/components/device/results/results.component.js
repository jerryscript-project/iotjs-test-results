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
    const { measurements, start, end } = this.props;
    const list = [...measurements].reverse().slice(start, end + 1).map(measurement => {
      if (measurement.measured) {
        return <ValidResult key={measurement.date.toISOString()} data={measurement}/>;
      } else {
        return <InvalidResult key={measurement.date.toISOString()} date={measurement.date}/>;
      }
    });

    return (
      <div className="list-group">
        {list}
      </div>
    );
  }
}

Results.propTypes = {
  measurements: PropTypes.array.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};
