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
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/fontawesome-free-solid';
import Summary from './summary/summary.component';

export default class ValidResult extends React.Component {

  constructor(props) {
    super(props);

    // Local state for each collapse object
    this.state = {
      collapsed: true,
    };

    this.handleCollapseClick = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
  }

  render() {
    const { data } = this.props;
    const { collapsed } = this.state;
    const color = data.tests.find(t => t.result === 'fail') ? 'danger' : 'success';
    const colorBoxStyle = {
      width: '10px',
    };

    return (
      <div className="list-group-item list-group-item-action list-group-item-light py-0 pl-0 pr-3 position-relative">
        <div className="row no-gutters">

          <div className={`col-auto bg-${color}`} style={colorBoxStyle}></div>

          <div className="col">
            <div className="row no-gutters">
              <div className="col-auto mr-auto p-2">
                <Summary tests={data.tests} />
              </div>

              <div className="col-auto py-2">
                <span className="font-weight-bold pr-3">
                  {data.date.format('YYYY-MM-DD')}
                </span>

                <div className="d-inline valid-collapse-button" onClick={this.handleCollapseClick}>
                  <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp} />
                </div>
              </div>
            </div>

            {!collapsed &&
              <div className="row no-gutters">
                <span>Content placeholder</span>
              </div>
            }

          </div>

        </div>
      </div>
    );
  }
}

ValidResult.propTypes = {
  data: PropTypes.object.isRequired,
};
