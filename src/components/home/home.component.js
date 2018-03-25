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
import { Switch, Route } from 'react-router-dom';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route path='/iotjs' render={() => (
            <h1 className="display-3 text-center font-weight-bold text-secondary mt-5">IoT.js</h1>
          )}/>
          <Route path='/jerryscript' render={() => (
            <h1 className="display-3 text-center font-weight-bold text-secondary mt-5">JerryScript</h1>
          )}/>
        </Switch>

        <p className="text-center font-weight-bold text-secondary h5 mb-5">
          Automated correctness and performance test results
        </p>
      </div>
    );
  }
}
