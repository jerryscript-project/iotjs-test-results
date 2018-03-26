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

export default class ProjectButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { active, children, onClick } = this.props;

    return (
      <button
        type="button"
        className={`btn btn-sm ${active ? 'btn-success active': 'btn-outline-secondary'}`}
        disabled={active}
        onClick={onClick}>
        {children}
      </button>
    );
  }
}


ProjectButton.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
