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
import MenuItem from '../menu-item/menu-item.component';

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { items, homeProject } = this.props;
    const list = items.map((i, index) => {
      return <MenuItem key={`${i.key}${index}`} title={i.name} link={`/${homeProject}/${i.key}`} />;
    });

    return (
      <div className="navbar-nav">
        <MenuItem title="Home" link={`/${homeProject}`} />
        {list}
      </div>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array.isRequired,
  homeProject: PropTypes.string.isRequired,
};
