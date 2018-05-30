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

export default class ValidResult extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const color = data.tests.find(t => t.result === 'fail') ? 'danger' : 'success';
    const colorBoxStyle = {
      width: '10px',
    };

    return (
      <div className="list-group-item list-group-item-action py-0 pl-0 pr-3.5 position-relative">
        <div className="row no-gutters">
          <div className={`col-auto mr-auto bg-${color}`} style={colorBoxStyle}></div>
          <div className="col-auto py-2">
            {data.date}
          </div>
        </div>
      </div>
    );
  }
}

ValidResult.propTypes = {
  data: PropTypes.object.isRequired,
};
