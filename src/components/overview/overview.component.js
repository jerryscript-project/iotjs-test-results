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
import OverviewIntro from '../overview-intro/overview-intro.component';
import OvervireDeviceList from '../overview-device-list/overview-device-list.container';

export default class IotjsOverview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { projects, match } = this.props;

    return (
      <div className="container">
        <OverviewIntro title={projects[match.params[0]].name} />
        <OvervireDeviceList project={match.params[0]} />
      </div>
    );
  }
}
