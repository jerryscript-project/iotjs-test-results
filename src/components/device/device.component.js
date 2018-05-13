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

export default class Device extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { match, devices, projects } = this.props;
    const project = projects[match.params.project];
    const device = devices.find(d => d.key === match.params.device);

    return (
      <div className="container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{project.name} Test Results - {device.name}</title>
        </Helmet>

        <DeviceHeader device={device} />
      </div>
    );
  }
}

Device.propTypes = {
  match: PropTypes.object.isRequired,
};
