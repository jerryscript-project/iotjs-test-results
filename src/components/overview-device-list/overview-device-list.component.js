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

  componentDidMount() {
    this.props.fetchResults(this.props.project);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.project !== nextProps.project) {
      this.props.fetchResults(nextProps.project);
    }
  }

  render() {
    const { loading, results, devices } = this.props;
    const list = results.map(data => {
      return <OverviewDevice
              key={`${data.project}-${data.device}`}
              name={devices.filter(device => device.key === data.device).pop().name}
              data={data.result} />;
    });

    return (
      <div className="row my-2">
        {loading ? (
          <div className="col my-4 py-2">
            <p className="text-center text-muted">Loading data...</p>
          </div>
        ) : (
          list
        )}
      </div>
    );
  }
}

OverviewDeviceList.propTypes = {
  loading: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
  devices: PropTypes.array.isRequired,
};
