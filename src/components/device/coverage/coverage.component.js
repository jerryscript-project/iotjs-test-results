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
import CoverageTable from './coverage-table/coverage-table.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Coverage extends React.Component {
  constructor(props) {
    super(props);

    this.getCoverage = () => {
      const { coverage } = this.props;
      return coverage;
    };

    this.getBadgeColor = result => {
      if (result >= 60) return 'success';
      if (result >= 30) return 'warning';
      return 'danger';
    };

    this.getCommitInfo = data => {
      const info = data[0].submodules.iotjs;
      const commit = {
        fullHash: info.commit,
        splitHash: info.commit.substring(0, 5),
        date: info.date.substring(0, 10),
        message: info.message,
      };
      return commit;
    };

    this.getLineInfo = data => {
      const info = data[0].coverage_info;

      const all = Object.keys(info).reduce((total, js) =>  {
        return total + parseInt(info[js].coverage[1]);
      }, 0);
      const covered = Object.keys(info).reduce((total, js) =>  {
        return total + parseInt(info[js].coverage[0]);
      }, 0);
      const percentage = Math.floor((covered / all) * 100);

      const lineInfo = {
        all: all,
        covered: covered,
        percentage: percentage,
      };
      return lineInfo;
    };
  }

  componentDidMount() {
    const { device } = this.props;
    this.props.fetchCoverage(device.key);
  }

  render() {
    const { project, device, location, load, error } = this.props;

    if ((project.key !== 'iotjs' || device.key === 'stm32f4dis') && !load) {
      return (
        <div className="row mt-3">
          <div className="col">
            <div className="text-center h4">
              <FontAwesomeIcon icon="comment-alt" />
              <span className="ml-3">
              Coverage info is not supported on {project.name} with {device.name} target
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (load || error) {
      return null;
    }

    const coverage = this.getCoverage();
    const commit = this.getCommitInfo(coverage);
    const lineInfo = this.getLineInfo(coverage);
    const color = this.getBadgeColor(lineInfo.percentage);
    const coverageTable = coverage[0].coverage_info;

    const fileName = location.substring(location.lastIndexOf('/') + 1);
    if (fileName === 'coverage' || fileName === '') {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <strong>Statements: </strong>
              {lineInfo.covered + '/' + lineInfo.all + '  '}
              <span className={`badge table-${color}`}>{lineInfo.percentage + '%'}</span>
            </div>
            <div className="col-sm">
              <strong>Lines:  </strong>
              {lineInfo.covered + '/' + lineInfo.all + '  '}
              <span className={`badge table-${color}`}>{lineInfo.percentage + '%'}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <strong>Commit: </strong>
              <a href={`${project.url}/commit/${commit.fullHash}`}>{commit.splitHash}</a>
            </div>
            <div className="col-sm">
            <strong>Date: </strong>
              {commit.date}
            </div>
          </div>
          <div className="mt-2">
            <CoverageTable coverage = {coverageTable} />
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="container">
          Work in Progress... Coverage info of {fileName} will be here.
        </div>
      );
    }

  }
}

Coverage.propTypes = {
  fetchCoverage: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  device: PropTypes.object.isRequired,
};
