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

export default class TestList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      passed: { active: false, type: 'success' },
      failed: { active: true, type: 'danger' },
      skipped: { active: false, type: 'warning' },
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
  }

  render() {
    const buttonList = this.getButtons();

    return (
      <div className="text-left">
        <h6>Ran test cases and their results</h6>
        <div className="btn-group" role="group">
          {buttonList}
        </div>
      </div>
    );
  }
}

TestList.propTpes = {};
