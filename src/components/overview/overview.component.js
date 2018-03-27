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
import { Switch, Route } from 'react-router-dom';
import Display3 from '../common/display-3.component';

export default class Overview extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchResults();
  }

  render() {
    const { loading } = this.props;

    return (
      <div className="container">

        <Switch>
          <Route path='/iotjs' render={() => (
            <Display3>IoT.js</Display3>
          )}/>
          <Route path='/jerryscript' render={() => (
            <Display3>JerryScript</Display3>
          )}/>
        </Switch>

        <p className="text-center font-weight-bold text-secondary h5 mb-5">
          Automated correctness and performance test results
        </p>

        <div className="jumbotron jumbotron-fluid rounded">
          <div className="container">
            <p>
              The purpose of this website is to show the official
              IoT.js and JerryScript test-suite results on different platforms.
              The testing happens once a day (at UTC 17:00) using the latest master.
            </p>
            <p>
              Since IoT.js and JerryScript focuses on low footprint devices,
              the run-time memory consumption is tracked during the test execution.
              This means that each passed tests have information about their peak usage of the stack
              and the heap memory areas. The size of each compiled project is also saved.
            </p>
            <p>
              The JerryScript binary size information is based on the stripped release build of JerryScript,
              by cross compiling for the Raspberry Pi 2 target.
            </p>
            <p>
              The collected values are visualized on charts that help to observe how each project evolves day by day.
              If you are interested in a platform, please choose one of the options below.
            </p>
          </div>
        </div>

        {loading &&
          <div className="my-6 py-2">
            <p className="text-center text-muted">Loading data...</p>
          </div>
        }

      </div>
    );
  }
}

Overview.propTypes = {
  fetchResults: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  devices: PropTypes.array.isRequired,
};
