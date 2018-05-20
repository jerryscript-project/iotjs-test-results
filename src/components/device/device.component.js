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
import { Helmet } from 'react-helmet';
import Header from './header/header.component';
import Loading from './loading/loading.component';
import Alert from './alert/alert.component';
import ChartWrapper from './chart-wrapper/chart-wrapper.container';

export default class Device extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMeasurements(this.props.match.params.project, this.props.match.params.device);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.project !== nextProps.match.params.project ||
        this.props.match.params.device !== nextProps.match.params.device) {
      this.props.fetchMeasurements(nextProps.match.params.project, nextProps.match.params.device);
    }
  }

  render() {
    const { match, loading, measurements, error, devices, projects } = this.props;
    const project = projects[match.params.project];
    const device = devices.find(d => d.key === match.params.device);

    return (
      <div className="container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{project.name} Test Results - {device.name}</title>
        </Helmet>

        <Header device={device} project={project} />

        <hr />

        {loading ? (
          <Loading deviceName={device.name} />
        ) : (
          error ? (
            <Alert device={device} error={error} />
          ) : (
            <div className="device-content">
              <ChartWrapper measurements={measurements} project={project}/>
            </div>
          )
        )}
      </div>
    );
  }
}

Device.propTypes = {
  loading: PropTypes.bool.isRequired,
  measurements: PropTypes.array.isRequired,
  error: PropTypes.any,
  devices: PropTypes.array.isRequired,
  projects: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fetchMeasurements: PropTypes.func.isRequired,
};
