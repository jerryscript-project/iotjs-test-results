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
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Header from './header/header.component';
import Loading from './loading/loading.component';
import Alert from './alert/alert.component';
import Missing from './missing/missing.component';
import Chart from './chart/chart.container';
import Results from './results/results.container';
import Pagination from './pagination/pagination.container';
import { devices, projects } from '../../constants';
import { Link } from "react-router-dom";
import { Switch, Route } from 'react-router';
import Coverage from './coverage/coverage.container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Device extends React.Component {

  constructor(props) {
    super(props);

    this.getInBetweenDates = (from, to) => {
      const diff = Math.abs(from.diff(to, 'day'));
      const correctedDiff = diff === 0 ? diff + 1 : diff;
      const array = [...Array(correctedDiff).keys()];

      return array.map(i => ({
        measured: false,
        date: from.clone().subtract(i + 1, 'day'),
      })).reverse();
    };

    this.getCompleteMeasurements = () => {
      const { measurements } = this.props;

      if (!measurements.length) {
        return [];
      }

      let next = moment.utc(measurements[0].date);
      let previous = null;
      let completed = [];

      measurements.forEach(m => {
        const current = moment.utc(m.date.substr(0, 10));

        if (previous && current.isSame(previous, 'day')) {
          return;
        }

        if (!current.isSame(next, 'day')) {
          completed = [...completed, ...this.getInBetweenDates(current, next)];
        }

        next = current.clone().add(1, 'day');
        previous = current.clone();

        completed = [...completed, { measured: true, ...m, date: current }];
      });

      const lastPlusOne = previous.clone().add(1, 'day');

      if (!previous.isSame(moment.utc(), 'day') && !lastPlusOne.isSame(moment.utc(), 'day')) {
        completed = [...completed, ...this.getInBetweenDates(moment.utc(), lastPlusOne)];
      }

      return completed;
    };

    this.loadingSection = device => this.props.loading ? <Loading deviceName={device.name} /> : null;

    this.alertSection = device => this.props.error ? <Alert device={device} error={this.props.error} /> : null;

    this.missingSection = (project, device) => {
      const { loading, measurements, error } = this.props;

      if (loading || error || measurements.length) {
        return null;
      }

      return <Missing deviceName={device.name} projectName={project.name} />;
    };

    this.contentSection = project => {
      const { loading, measurements, error } = this.props;

      if (loading || error || !measurements.length) {
        return null;
      }

      const renderData = this.getCompleteMeasurements();
      const {match} = this.props;
      const device = devices.find(d => d.key === match.params.device);

      return (
        <div className="device-content">
          <Chart measurements={renderData} project={project} />
          <hr />
          <div className="row mt-2 text-center">
            <div className="col">
              <Link to={`${device.key}/coverage`} target="_blank">
                <FontAwesomeIcon icon="chart-area" />
                <span className="ml-2">Coverage</span>
              </Link>
            </div>
          </div>
          <hr />
          <Pagination length={renderData.length} />
          <Results measurements={renderData} project={project} />
        </div>
      );
    };

    this.loadCoverage = (project, device) => {
      const { loading, error } = this.props;

      if (error) {
        return null;
      }

      if (loading) {
        return (<Loading deviceName={'coverage'}/>);
      }

      return (<Coverage project={project} device={device} location={this.props.location.pathname}/>);
    };
  }

  componentDidMount() {
    const { match } = this.props;

    this.props.fetchMeasurements(match.params.project, match.params.device);
  }

  componentWillReceiveProps(nextProps) {
    const { match, fetchMeasurements, resetPagination } = this.props;

    if (match.params.project !== nextProps.match.params.project ||
        match.params.device !== nextProps.match.params.device) {
      fetchMeasurements(nextProps.match.params.project, nextProps.match.params.device);
      resetPagination();
    }
  }

  render() {
    const { match } = this.props;
    const project = projects[match.params.project];
    const device = devices.find(d => d.key === match.params.device);

    return (
      <div className="container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{project.name} Test Results - {device.name}</title>
        </Helmet>

        <Header device={device} project={project} />


        <Switch>
          <Route
            exact path={`${match.path}`}
            render={() => <div className="container">
                            {this.loadingSection(device)}
                            {this.alertSection(device)}
                            {this.missingSection(project, device)}
                            {this.contentSection(project)}
                          </div>}
          />
          <Route
            path={`${match.path}/coverage`}
            render={() => <div className="container">
                            {this.loadCoverage(project, device)}
                          </div>}
          />
        </Switch>
      </div>
    );
  }
}

Device.propTypes = {
  loading: PropTypes.bool.isRequired,
  measurements: PropTypes.array.isRequired,
  error: PropTypes.any,
  match: PropTypes.object.isRequired,
  fetchMeasurements: PropTypes.func.isRequired,
  resetPagination: PropTypes.func.isRequired,
};
