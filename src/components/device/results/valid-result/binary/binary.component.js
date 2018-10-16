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

export default class Binary extends React.Component {

  constructor(props) {
    super(props);

    this.getSize = () => {
      const { profile } = this.props;

      if (profile) {
        const data = parseInt(profile.data) || 0;
        const rodata = parseInt(profile.rodata) || 0;
        const text = parseInt(profile.text) || 0;

        return data + rodata + text;
      }

      return 'n/a';
    };
  }

  render() {
    const size = this.getSize();

    return (
      <div>
        <span>Binary size: </span>
        <span className="font-weight-bold">{size} B</span>
      </div>
    );
  }
}

Binary.propTypes = {
  profile: PropTypes.object.isRequired,
};
