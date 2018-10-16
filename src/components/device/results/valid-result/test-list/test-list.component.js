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
import TestListTable from '../test-list-table/test-list-table.component';

export default class TestList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      passed: { active: false, type: 'success', id: 'pass' },
      failed: { active: true, type: 'danger', id: 'fail' },
      timeout: {active: true, type: 'info', id: 'timeout'},
      skipped: { active: false, type: 'warning', id: 'skip' },
    };

    this.handleButtonClick = filter => {
      this.setState({
        [filter]: {
          ...this.state[filter],
          active: !this.state[filter].active,
        },
      });
    };

    this.getButtons = () => {
      return Object.keys(this.state).map(key => {
        const filter = this.state[key];
        const activeClass = filter.active ? ' active': '';
        return (
          <div
            key={key}
            className={`btn btn-sm btn-outline-${filter.type}${activeClass}`}
            onClick={() => this.handleButtonClick(key)}>
            <span className="text-capitalize">{key}</span>
          </div>
        );
      });
    };

    this.getData = () => {
      const { data } = this.props;
      const filters = Object.keys(this.state).filter(key => this.state[key].active).map(f => this.state[f].id);

      if (data && data.tests) {
        return data.tests.filter(t => filters.includes(t.result));
      }

      return [];
    };
  }

  render() {
    const buttonList = this.getButtons();
    const filteredData = this.getData();

    return (
      <div className="tests-details">

        <div className="row mb-2">
          <div className="col">
            <div className="text-left">
              <h6>Ran test cases and their results</h6>
              <div className="btn-group" role="group">
                {buttonList}
              </div>
            </div>
          </div>
        </div>

        <div className="row" style={{maxHeight: '300px'}}>
          <div className="col" style={{overflowX: 'hidden'}}>
            <TestListTable data={filteredData}/>
          </div>
        </div>

      </div>
    );
  }
}

TestList.propTpes = {
  data: PropTypes.object.isRequired,
};
