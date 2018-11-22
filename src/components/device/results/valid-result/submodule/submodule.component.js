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

export default class Submodule extends React.Component {
  render() {
    const { data, project } = this.props;
    const commitStyle = {
      width: '55px',
    };
    const messageStyle = {
      width: '310px',
    };

    return (
      <div className="d-flex">
        <span className="mr-2">
          {project.name}
        </span>

        <span className="ml-2 mr-4 text-center" style={commitStyle}>
          <a target="_blank" rel="noopener noreferrer" href={`${project.url}/commit/${data.commit}`}>
            {data.commit.substring(0, 6)}
          </a>
        </span>

        <span className="text-truncate pr-2" style={messageStyle} title={data.message}>
          {data.message}
        </span>
      </div>
    );
  }
}

Submodule.propTypes = {
  data: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
