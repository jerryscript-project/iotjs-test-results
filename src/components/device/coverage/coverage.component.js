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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CoverageModal from './coverage-modal/coverage-modal.component';

export default class Coverage extends React.Component {
  constructor(props) {
    super(props);

    this.getCoverage = () => {
      const { coverage } = this.props;
      return coverage;
    };
  }

  componentDidMount() {
    const { device } = this.props;
    this.props.fetchCoverage(device.key);
  }

  render() {
    const { project, device, load, error } = this.props;

    if (project.key !== 'iotjs' || device.key === 'stm32f4dis' || load || error) {
      return null;
    }
    const coverage = this.getCoverage();

    return (
      <div className="row mt-2 text-center">
        <div className="col">

          <div className="btn btn-link" data-toggle="modal" data-target="#coverage-info">
            <FontAwesomeIcon icon="chart-area" />
            <span className="ml-2">Coverage</span>
          </div>
          <CoverageModal project={project} device={device} coverage={coverage}/>
          <hr />
        </div>
      </div>

    )
  }

}

Coverage.propTypes = {
  fetchCoverage: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  device: PropTypes.object.isRequired,
};
