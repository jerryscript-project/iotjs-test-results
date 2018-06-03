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
import MomentPropTypes from 'react-moment-proptypes';

export default class InvalidResult extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { date } = this.props;
    const dateStle = {
      minWidth: '110px',
    };

    return (
      <div className="list-group-item list-group-item-action py-1 pr-5">
        <div className="d-flex justify-content-between text-muted">
          <span>No change today in the repositories</span>
          <span className="text-right" style={dateStle}>{date.format('YYYY-MM-DD')}</span>
        </div>
      </div>
    );
  }
}

InvalidResult.propTypes = {
  date: MomentPropTypes.momentObj,
};
