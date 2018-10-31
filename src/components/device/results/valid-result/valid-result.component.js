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
import Summary from './summary/summary.component';
import Binary from './binary/binary.component';
import Submodule from './submodule/submodule.component';
import Details from './details/details.component';

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
    const { data, project } = this.props;
    const { collapsed } = this.state;
    const color = data.tests.find(t => t.result === 'fail') ? 'danger' : 'success';
    const colorBoxStyle = {
      width: '10px',
    };
    const action = collapsed ? 'list-group-item-action' : '';

    return (
      <div className={`list-group-item ${action} list-group-item-light py-0 pl-0 pr-3 position-relative`}>
        <div className="row no-gutters">

          <div className={`col-auto bg-${color}`} style={colorBoxStyle}></div>

          <div className="col">
            <div className="row no-gutters py-2 pl-2">
              <div className="col-auto pr-2">
                <Summary tests={data.tests} />
              </div>

              {collapsed &&
                <div className="d-none d-md-block col-auto border-left border-right px-1">
                  <Binary profile={data.bin['target-profile']} />
                </div>
              }

              {collapsed &&
                <div className="d-none d-xl-block col-auto mr-auto px-3">
                  <Submodule data={data.submodules[project.key]} project={project} />
                </div>
              }

              <div className="col-auto ml-auto">
                <span className="font-weight-bold pr-3">
                  {data.date.format('YYYY-MM-DD')}
                </span>

                <div className="d-inline valid-collapse-button" onClick={this.handleCollapseClick}>
                  <FontAwesomeIcon icon={collapsed ? 'chevron-down' : 'chevron-up'} />
                </div>
              </div>
            </div>

            {!collapsed && <Details data={data} />}

          </div>

        </div>
      </div>
    );
  }
}

ValidResult.propTypes = {
  data: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
