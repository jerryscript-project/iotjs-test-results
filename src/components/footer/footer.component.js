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

export default class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer bg-dark text-center text-white">

        <p className="my-2">
          IoT.js Test Results is an open source project under the
          <a className="ml-1" target="_self" href="https://github.com/Samsung/iotjs-test-results/blob/master/LICENSE">
            Apache License, Version 2.0
          </a>
        </p>

      </footer>
    );
  }
}
