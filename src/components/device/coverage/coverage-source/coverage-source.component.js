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

export default class CoverageSource extends React.Component {
  constructor(props) {
    super(props);

    this.getRowColor = data => {
      switch (data) {
        case '1':
          return 'red';
        case '2':
          return 'green';
        default:
          return 'white';
      }
    };

    this.getBadgeColor = result => {
      if (result >= 60) return 'success';
      if (result >= 30) return 'warning';
      return 'danger';
    };
  }
  render() {
    const { coverage, fileName } = this.props;
    const sourceLines = coverage[0].coverage_info[fileName].lines;
    const lines = coverage[0].coverage_info[fileName].coverage;
    let percentage = 0;
    if (lines[1] !== 0) {
      percentage = Math.floor((lines[0] / lines[1]) * 100);
    }
    const badgeColor = this.getBadgeColor(percentage);

    const source = sourceLines.map((line, index) => {
      const color = this.getRowColor(line[1]);
      return (
        <tr key={index}>
          <td className="line-number">{index + 1}</td>
          <td>
            <span className={`row-background-${color}`} style={{whiteSpace: `pre`, fontSize: '1em'}}>
              {line[0]}
            </span>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <div style={{fontSize: '1.2em', fontWeight: 'bold', marginTop: '3em'}}>
          Source for {fileName}.js
          <span className={`badge table-${badgeColor}`} style={{float: 'right'}}>
            {`${lines[0]}/${lines[1]} ${percentage}%`}
          </span>
        </div>
        <hr className="source-line"/>
        <table style={{marginTop: '3em'}}>
          <thead>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody className="source">
            {source}
          </tbody>
        </table>
      </div>
    );
  }
}

