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

export default class TestListTableBody extends React.Component {

  constructor(props) {
    super(props);

    this.getRowColor = result => {
      switch (result) {
        case 'timeout':
          return 'info';
        case 'fail':
          return 'danger';
        case 'skip':
          return 'warning';
        case 'pass':
        default:
          return 'success';
      }
    };

    this.getMemory = data => {
      const memStats = ['n/a', 'n/a', 'n/a', 'n/a'];

      if (data.result !== 'pass' || !('memstat' in data))
        return memStats;

      ['heap-jerry', 'heap-system', 'stack', 'change'].forEach((area, i) => {
        const postfix = (area === 'change') ? '%' : 'B';
        memStats[i] = isNaN(parseInt(data.memstat[area])) ? 'n/a' : data.memstat[area] + postfix;
      });

      return memStats;
    };

  }
  render() {
    const { data } = this.props;
    const rows = Object.keys(data).map(key => {
      const color = this.getRowColor(data[key].result);
      const memory = this.getMemory(data[key]);

      return (
        <tr key={`${key.toString()}-${data[key].name}`} className={`table-${color}`} style={{overflowY: 'auto'}}>
          <td>{data[key].name}</td>
          <td>{memory[0]}</td>
          <td>{memory[1]}</td>
          <td>{memory[2]}</td>
          <td>{memory[3]}</td>
          <td>{data[key].output}</td>
        </tr>
      );
    });

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
}

TestListTableBody.propTpes = {
  data: PropTypes.object.isRequired,
};
