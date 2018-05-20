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
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProjectSwitcher extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { select, current, url, resetDevice } = this.props;
    const active = select.key === current.key;
    const link = url.includes(select.key) ? url : url.replace(current.key, select.key);

    return (
      <Link
        className={`btn btn-sm ${active ? 'btn-light disabled': 'btn-outline-secondary'}`}
        disabled={active}
        to={link}
        onClick={resetDevice} >
        {select.name}
      </Link>
    );
  }
}


ProjectSwitcher.propTypes = {
  select: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  resetDevice: PropTypes.func.isRequired,
};
