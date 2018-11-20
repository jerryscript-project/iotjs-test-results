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
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

export default class CoverageTable extends React.Component {
  constructor(props) {
    super(props);

    this.calculatePercentage = array => {
      const compareFirst = parseInt(array[1]);
      const compareSecond = parseInt(array[0]);
      const percentage = Math.round((compareSecond / compareFirst) * 100);
      return percentage;
    }

    this.getRowColor = result => {
      if (result >= 60) return '348d00';
      if (result >= 30) return 'f5e342';
      return '4e4e4e';
    };
  }
  render () {
    const { coverage } = this.props;
    const rows = Object.keys(coverage).map((fileName)=> {
      const coverageInfo = ['Not reached by test suite'];
      const percentage = [0, 'n/a'];
      if (coverage[fileName].coverage[0] !== 0 && coverage[fileName].coverage[1] !== 0) {
        coverageInfo[0] = coverage[fileName].coverage[0];
        coverageInfo[1] = '/' + coverage[fileName].coverage[1];
        percentage[0] = this.calculatePercentage(coverage[fileName].coverage);
        percentage[1] = percentage[0] + '%';
      }
      const color = this.getRowColor(percentage[0]);

      return (
        {
          fileName: `${fileName}.js`,
          percentageBar:
          <div className='progress-bar' >
            <div className='filler' style={{ width:`${percentage[0]}%` ,
                                            background:`#${color}`}}/>
          </div>,
          percentage: percentage,
          covered: coverageInfo[0] + coverageInfo[1],
        }
      );
    });

    return (
      <ReactTable
      data={rows}
      columns={[
        {
          Header:() => (
            <span>
              <FontAwesomeIcon icon="sort" /> File name
            </span>
          ),
          accessor: "fileName",
          Cell: fileName =>
            <Link className={`btn btn-link file-name`}
              to={`coverage/${fileName.value}`}
              target="_blank" >
              {fileName.value}
            </Link>,
        },
        {
          Header: "Progress Bar",
          accessor: "percentageBar",
          sortable: false
        },
        {
          Header: () => (
            <span>
              <FontAwesomeIcon icon="sort" /> Percentage
            </span>
          ),
          id: "percentage",
          accessor: a => {
            return a.percentage[1];
          },
          sortMethod: (a, b) => {
            a = parseInt(a) || 0;
            b = parseInt(b) || 0;
            return a-b;
          }
        },
        {
          Header: "",
          accessor: "covered",
          sortable: false
        }
      ]}
      defaultSorted={[
        {
          id: "percentage",
          desc: true
        },
        {
          id: "fileName",
          desc: false
        }
      ]}
      showPagination={false}
      defaultPageSize={Object.keys(coverage).length}
      className="-striped -highlight"
    />
    );
  };
}
