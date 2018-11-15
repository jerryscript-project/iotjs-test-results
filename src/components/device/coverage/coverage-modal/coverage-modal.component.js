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
import CoverageTable from '../coverage-table/coverage-table.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class CoverageModal extends React.Component {

  constructor(props) {
    super(props);

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

  render() {
    const { project, device, coverage } = this.props;
    const commit = this.getCommitInfo(coverage);
    const lineInfo = this.getLineInfo(coverage);
    const color = this.getBadgeColor(lineInfo.percentage);
    const coverageTable = coverage[0].coverage_info;

    return (
      <div
      className="modal fade"
      id="coverage-info"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true">
       <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`coverage-info-title`}>
                Coverage info for {device.name}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body text-left">
            <ul>
              <li>
                <strong>Statements: </strong>
                {lineInfo.covered + '/' + lineInfo.all + '  '}
                <span className={`badge table-${color}`}>{lineInfo.percentage + '%'}</span>
              </li>
              <li>
                <strong>Lines:  </strong>
                {lineInfo.covered + '/' + lineInfo.all + '  '}
                <span className={`badge table-${color}`}>{lineInfo.percentage + '%'}</span>
              </li>
            </ul>

              <div className="container">
                <div className="row">
                  <div className="col-sm text-center">
                    <FontAwesomeIcon icon="comment-dots" />
                    Commit:
                    <a href={`${project.url}/commit/${commit.fullHash}`}>{commit.splitHash}</a>
                  </div>

                  <div className="col-sm text-center">
                    {commit.message}
                  </div>

                  <div className="col-sm text-center">
                    {commit.date}
                  </div>
                </div>
              </div>
            </div>
            <CoverageTable coverage = {coverageTable} />
          </div>
        </div>
      </div>
    );
  }
}

CoverageModal.propTypes = {
  project: PropTypes.object.isRequired,
  device: PropTypes.object.isRequired,
};
