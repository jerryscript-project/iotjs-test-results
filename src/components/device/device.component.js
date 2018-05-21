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
import Header from './header/header.component';
import Loading from './loading/loading.component';
import Alert from './alert/alert.component';
import Missing from './missing/missing.component';
import ChartWrapper from './chart-wrapper/chart-wrapper.container';
import Pagination from './pagination/pagination.container';
import { devices, projects } from '../../constants';

export default class Device extends React.Component {

  constructor(props) {
    super(props);

    this.loadingSection = device => {
      const { loading } = this.props;

      if (!loading) return null;

      return <Loading deviceName={device.name} />;
    };

    this.alertSection = device => {
      const { error } = this.props;

      if (!error) return null;

      return <Alert device={device} error={error} />;
    };

    this.contentSection = project => {
      const { loading, measurements, error } = this.props;

      if (loading || error || !measurements.length) return null;

      return (
        <div className="device-content">
          <ChartWrapper measurements={measurements} project={project} />
          <hr />
          <Pagination length={measurements.length} />
        </div>
      );
    };

    this.missingSection = (project, device) => {
      const { loading, measurements, error } = this.props;

      if (loading || error || measurements.length) return null;

      return <Missing deviceName={device.name} projectName={project.name} />;
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

        {this.loadingSection(device)}
        {this.alertSection(device)}
        {this.missingSection(project, device)}
        {this.contentSection(project)}

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
