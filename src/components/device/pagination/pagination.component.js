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
import { pagination } from '../../../constants';

export default class Pagination extends React.Component {

  constructor(props) {
    super(props);

    this.getPages = () => {
      const { length, selected, handleSelectClick } = this.props;
      const maxLength = Math.ceil(length / pagination.numberOfTestPerPage);

      let lastHiddenPage = null;

      return [...Array(maxLength).keys()].map(p => {
        const active = selected === p;
        const start = p * pagination.numberOfTestPerPage + 1;
        const end = p * pagination.numberOfTestPerPage + pagination.numberOfTestPerPage;

        if (p === 0 ||
            p === maxLength - 1 ||
            (selected < 4 && p < 5) ||
            (selected > maxLength - 5 && p > maxLength - 6) ||
            (selected - 1 <= p && p <= selected + 1)) {
          return (
            <li
              key={p.toString()}
              className={`page-item${active ? ' active' : ''}`}
              onClick={() => !active ? handleSelectClick(p, start, end) : null}>
              <div className="page-link">
                {p + 1} {active && <span className="sr-only">(current)</span>}
              </div>
            </li>
          );
        }

        let hidden = (
          <li key={p.toString()} className="page-item disabled">
            <div className="page-link">...</div>
          </li>
        );

        if (lastHiddenPage === p - 1) {
          hidden = null;
        }

        lastHiddenPage = p;
        return hidden;
      });
    };
  }

  render() {
    const { length, selected, handlePreviousClick, handleNextClick } = this.props;
    const previous = selected !== 0;
    const next = selected * pagination.numberOfTestPerPage + pagination.numberOfTestPerPage < length;

    const pages = this.getPages();

    return (
      <div className="row">
        <div className="col">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">

              <li
                className={`page-item${!previous ? ' disabled' : ''}`}
                onClick={() => previous ? handlePreviousClick() : null}>
                <div className="page-link">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </div>
              </li>

              {pages}

              <li
                className={`page-item${!next ? ' disabled' : ''}`}
                onClick={() => next ? handleNextClick() : null}>
                <div className="page-link">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </div>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  length: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handleSelectClick: PropTypes.func.isRequired,
};
