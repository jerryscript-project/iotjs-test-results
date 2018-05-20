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
import { NavLink } from 'react-router-dom';

export default class MenuListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { title, link } = this.props;

    return (
      <li className="nav-item">
        <NavLink className=" nav-link" activeClassName="active" exact to={link}>
          {title}
        </NavLink>
      </li>
    );
  }
}

MenuListItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
