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
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faArrowAltCircleRight } from '@fortawesome/fontawesome-free-regular';

export default class OverviewDevice extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { name, data } = this.props;

    return (
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 my-2">
        <Link className="text-dark overview-device-link" to={`${data.project}/${data.device}`}>
          <div className="card">
            <div className="card-body">

              <h5 className="card-title text-center">{name}</h5>

              {data && data.result ? (
                <div>
                  <h6 className="card-subtitle mb-4 text-muted text-center">
                    <span>Last measured </span>
                    <span className="font-weight-bold">{data.result.date.substr(0, 10)}</span>
                  </h6>

                  <div className="row mt-4">
                    <div className="col text-center" title="Passed">
                      <FontAwesomeIcon className="text-success" icon={faCheckCircle} />
                      <span className="ml-1">{data.result.tests.filter(t => t.result === 'pass').length}</span>
                    </div>
                    <div className="col text-center" title="Failed">
                      <FontAwesomeIcon className="text-danger" icon={faTimesCircle} />
                      <span className="ml-1">{data.result.tests.filter(t => t.result === 'fail').length}</span>
                    </div>
                    <div className="col text-center" title="Skipped">
                      <FontAwesomeIcon className="text-warning" icon={faArrowAltCircleRight} />
                      <span className="ml-1">{data.result.tests.filter(t => t.result === 'skip').length}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h6 className="card-subtitle mb-4 text-muted text-center">
                    <span>---</span>
                  </h6>

                  <div className="row mt-4">
                    <div className="col text-center text-muted">
                      <span>Not measured yet...</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </Link>
      </div>
    );
  }
}

OverviewDevice.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object,
};
