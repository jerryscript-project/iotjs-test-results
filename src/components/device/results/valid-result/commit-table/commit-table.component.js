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
import { submodules } from '../../../../../constants';

export default class CommitTable extends React.Component {
  render() {
    const { info } = this.props;
    const trs = Object.keys(info).map((key, i) => {
      if (!submodules[key]) {
        return null;
      }

      return (
        <tr key={`${key}-${i}`}>
          <th scope="row">{submodules[key].name}</th>
          <td>
            <a target="_blank" rel="noopener noreferrer" href={`${submodules[key].url}${info[key].commit}`}>
              {info[key].commit.substring(0, 6)}
            </a>
          </td>
          <td>{info[key].message}</td>
        </tr>
      );
    });

    return (
      <div className="table-responsive-md">
        <p className="h6">Submodule commit informations</p>
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Module</th>
              <th scope="col">Commit</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {trs}
          </tbody>
        </table>
      </div>
    );
  }
}

CommitTable.propTypes = {
  info: PropTypes.object.isRequired,
};
