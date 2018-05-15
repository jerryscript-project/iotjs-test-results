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
import DeviceHeader from '../device-header/device-header.component';
import DeviceLoading from '../device-loading/device-loading.component';
import DeviceAlert from '../device-alert/device-alert.component';

export default class Device extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData(this.props.match.params.project, this.props.match.params.device);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.project !== nextProps.match.params.project ||
        this.props.match.params.device !== nextProps.match.params.device) {
      this.props.fetchData(nextProps.match.params.project, nextProps.match.params.device);
    }
  }

  render() {
    const { match, loading, data, error, devices, projects } = this.props;
    const project = projects[match.params.project];
    const device = devices.find(d => d.key === match.params.device);

    return (
      <div className="container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{project.name} Test Results - {device.name}</title>
        </Helmet>

        <DeviceHeader device={device} project={project} />

        <hr />

        {loading ? (
          <DeviceLoading deviceName={device.name} />
        ) : (
          error ? (
            <DeviceAlert device={device} error={error} />
          ) : (
            <p className="text-center">{data.date}</p>
          )
        )}
      </div>
    );
  }
}

Device.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.any,
  devices: PropTypes.array.isRequired,
  projects: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
