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

export default class Loading extends React.Component {
  render() {
    const { deviceName } = this.props;

    return (
      <div className="row mt-3">
        <div className="col">
          <div className="text-center h4">
            <FontAwesomeIcon icon="spinner" spin />
            <span className="ml-3">Loading {deviceName} data...</span>
          </div>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  deviceName: PropTypes.string.isRequired,
};
