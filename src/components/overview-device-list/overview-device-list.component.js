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
import OverviewDevice from '../overview-device/overview-device.component';

export default class OverviewDeviceList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { devices, results } = this.props;
    const list = results.map(data => {
      return <OverviewDevice
              key={data.device}
              name={devices.filter(device => device.key === data.device).pop().name}
              data={data.result} />;
    });

    return (
      <div className="row my-2">
        {list}
      </div>
    );
  }
}

OverviewDeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
};
