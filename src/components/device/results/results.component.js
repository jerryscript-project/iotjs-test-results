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

export default class Results extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { measurements, start, end } = this.props;
    const list = [...measurements].reverse().slice(start, end + 1).map(m => {
    return (
      <div key={m.date} className="list-group-item list-group-item-action">
        {m.date}
      </div>);
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
