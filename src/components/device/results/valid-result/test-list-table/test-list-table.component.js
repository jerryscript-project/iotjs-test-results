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

export default class TestListTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const body = data.length ? (
        <tr className="text-center">
          <td colSpan="4">There are available test results</td>
        </tr>
      ) : (
        <tr className="text-center">
          <td colSpan="4">There are no available test results in the selected view</td>
        </tr>
      );

    return (
      <table className="table table-bordered table-sm table-hover">
        <thead>
          <tr>
            <th scope="col">Test</th>
            <th scope="col">Memory</th>
            <th scope="col">Change</th>
            <th scope="col">Output / Reason</th>
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    );
  }
}

TestListTable.propTpes = {
  data: PropTypes.object.isRequired,
};
