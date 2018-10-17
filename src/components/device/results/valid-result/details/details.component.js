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
import SizeTable from '../size-table/size-table.component';
import CommitTable from '../commit-table/commit-table.component';
import TestList from '../test-list/test-list.component';

export default class Details extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div className="row py-3 px-2">
        <div className="col">
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <SizeTable info={data.bin} />
            </div>

            <div className="col-xl-8 col-lg-8">
              <CommitTable info={data.submodules} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TestList {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Details.propTpes = {
  data: PropTypes.object.isRequired,
};
