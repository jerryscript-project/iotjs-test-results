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

export default class Alert extends React.Component {
  render() {
    const { device, error } = this.props;

    return (
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <FontAwesomeIcon icon="exclamation-triangle" />
        <strong> {device.name} Error!</strong> {error.message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

Alert.propTypes = {
  device: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
