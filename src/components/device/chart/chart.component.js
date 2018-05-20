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
import { Line } from 'react-chartjs-2';

export default class Chart extends React.Component {

  constructor(props) {
    super(props);

    this.getDateData = date => new Date(date).toISOString().substr(0, 10);

    this.getBinaryData = (data, profile) => {
      if (data.bin[profile]) {
        const bdata = parseInt(data.bin[profile].data) || 0;
        const rodata = parseInt(data.bin[profile].rodata) || 0;
        const text = parseInt(data.bin[profile].text) || 0;

        const size = bdata + rodata + text;

        return size >= 0 ? (size / 1024).toFixed(1) : null;
      }

      return null;
    };

    this.getMemoryData = tests => ((tests.reduce((acc, test) => {
      if (test.memstat) {
        const jerryHeap = parseInt(test.memstat['heap-jerry']) || 0;
        const systemHeap = parseInt(test.memstat['heap-system']) || 0;
        const stack = parseInt(test.memstat['stack']) || 0;

        return acc + jerryHeap + systemHeap + stack;
      } else {
        return acc;
      }
    }, 0) / tests.filter(test => test.memstat).length) / 1024).toFixed(1);

    this.getCommitData = data => data.submodules[this.props.project.key].commit.substring(0, 7);

    this.getDisplayData = data => {
      const start = {
        labels: [],
        target: [],
        minimal: [],
        memory: [],
        commits: [],
      };

      if (data) {
        return data.reduce((acc, d) => {
          acc.labels = [...acc.labels, this.getDateData(d.date)];
          acc.target = [...acc.target, this.getBinaryData(d, 'target-profile')];
          acc.minimal = [...acc.minimal, this.getBinaryData(d, 'minimal-profile')];
          acc.memory = [...acc.memory, this.getMemoryData(d.tests)];
          acc.commits = [...acc.commits, this.getCommitData(d)];

          return acc;
        }, start);
      }

      return start;
    };

    this.navigateToCommit = (point, commits) => {
      if (point && point._index) window.open(`${this.props.project.url}/commit/${commits[point._index]}`);
    };
  }

  render() {
    const { data } = this.props;
    const { labels, target, minimal, memory, commits } = this.getDisplayData(data);

    const binaryData = {
      labels,
      datasets: [
        {
          label: 'target-profile binary size',
          borderColor: '#ff7f0e',
          backgroundColor: '#ff7f0e',
          data: target,
          commitData: commits,
          fill: false,
          lineTension: 0,
          spanGaps: true,
        }, {
          label: 'minimal-profile binary size',
          borderColor: '#aec7e8',
          backgroundColor: '#aec7e8',
          data: minimal,
          commitData: commits,
          fill: false,
          lineTension: 0,
          spanGaps: true,
        },
      ],
    };

    const memoryData = {
      labels,
      datasets: [{
        label: 'average memory consumption',
        borderColor: '#ff7f0e',
        backgroundColor: '#ff7f0e',
        data: memory,
        commitData: commits,
        fill: false,
        lineTension: 0,
        spanGaps: true,
      }],
    };

    const options = {
      tooltips: {
        position: 'nearest',
        mode: 'index',
        intersect: false,
        titleFontSize: 14,
        titleMarginBottom: 18,
        bodyFontSize: 14,
        bodySpacing: 6,
        footerFontSize: 14,
        footerMarginTop: 18,
        callbacks: {
          label: (tooltipItem, data) => {
            const label = data.datasets[tooltipItem.datasetIndex].label;
            const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return ` ${label}: ${value} KB`;
          },
          footer: tooltipItem => {
            return `commit: ${commits[tooltipItem[0].index]}`;
          },
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: (value) => `${value} KB`,
          },
        }],
      },
      legend: {
        position: 'top',
      },
    };

    return (
      <div className="row my-2">
        <div className="col-lg-6">
          <Line
            data={binaryData}
            options={options}
            getElementAtEvent={point => this.navigateToCommit(point[0], binaryData.datasets[0].commitData)} />
        </div>
        <div className="col-lg-6">
          <Line
            data={memoryData}
            options={options}
            getElementAtEvent={point => this.navigateToCommit(point[0], memoryData.datasets[0].commitData)} />
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
};
