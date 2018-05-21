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
import DeviceListItem from '../device-list-item/device-list-item.component';
import { devices } from '../../../constants';

export default class DeviceList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { project } = this.props;
    this.props.fetchResults(project, devices);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.project !== nextProps.project) {
      this.props.fetchResults(nextProps.project, devices);
    }
  }

  render() {
    const { loading, results } = this.props;
    const list = results.map(data => {
      return <DeviceListItem
              key={`${data.project}-${data.device}`}
              name={devices.filter(device => device.key === data.device).pop().name}
              data={data} />;
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

DeviceList.propTypes = {
  loading: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
};
