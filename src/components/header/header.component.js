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
import ProjectButton from '../project-button/project-button.container';
import { project } from '../project-button/project-button.constans';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark">
          <div className="container">

            <div className="form-inline">
              <div className="btn-group" role="group">
                <ProjectButton project={project.iotjs}>
                  <span>IoT.js</span>
                </ProjectButton>
                <ProjectButton project={project.jerryscript}>
                  <span>JerryScript</span>
                </ProjectButton>
              </div>
            </div>

          </div>
        </nav>
      </header>
    );
  }
}
